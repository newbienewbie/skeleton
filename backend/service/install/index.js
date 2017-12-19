const fs=require('fs');
const path=require('path');
const url=require('url');
const domain=require('../../domain');
const signupService=require('../account/signup-service.js');
const roleService=require('../account/role-service.js'); 
const userService=require('../account/user-service');
const parseDbJsonToEntity=require('./parseDbJsonToEntity');
const config=require("../../config").getConfig();
const categoryService=require('../../service/common/category');
const resourceService=require('../../service/account/resource-service');
 
/**
 * 锁定文件的路径 
 */
const lockFilePath=path.join(config.basePath.lock,"install.js.lock");


/**
 * 验证是否可安装
 */
function checkInstallable(){
    return new Promise(function(resolve,reject){
        fs.exists(lockFilePath,function(exists){
            if(exists){
                reject('程序已经安装并被锁定');
            }else{
                resolve();
            }
        });
    });
};


/**
 * 创建锁定文件
 */ 
function createLockFile(){
    return new Promise(function(resolve,reject){
        fs.open(lockFilePath, "wx", function (err, fd) {
            if(err){
                reject(err);
            }
            else{
                fs.close(fd, function (err) {
                    if(err){
                        reject(err);
                    }else{
                        resolve();
                    }
                });
            }
        });
    });
}


/**
 * 安装数据库
 */
function install(){

    return ensureUtf8Database()
        .then(
            ()=>{ return domain.sequelize.sync({ force: true }); },
            (reason)=>{ return Promise.reject(reason); }
        );
}

/**
 * 确保database 是 utf8 字符集
 */
function ensureUtf8Database(){
    const database=domain.sequelize.config.database;
    return domain.sequelize.query(`alter database ${database} character set utf8;`);
}

/**
 * 初始化核心基础表，应该在数据库建立完成后立即执行，然后才能执行创建管理员、填充数据的任务
 */
function initCoreData(){
    const entityNames=["role"];
    return initData(entityNames);
}


/**
 * 创建根用户
 */
function createRootUser(username="root",password="toor",email="itminus@163.com"){
    return signupService.generateInvitationCode(1)
        .then( activeCode=>{ 
            return signupService.signup(username,password,email,activeCode.code);
        })
        .then(
            (info)=>{
                // 在已经注册好的用户的角色的基础上，再追加一个'ROLE_ROOT'角色
                return roleService.addRolesForUser(info.userEntity.id,[1]);
            },
            (reason)=>{
                throw reason;
            }
        );
}


/**
 * 初始化预定义的数据
 */
function initPredefinedData(){
    const entityNames=["country","language","category","ebook"];
    return initData(entityNames);
}


/**
 * 填充数据到数据库
 * @private
 * @param {Array} entityNames 
 */
function initData(entityNames){
    const PATH=path.join(__dirname,"..","..","..","db-init-data");
    const promises=entityNames.map(i=>{
        let s=`${i}.json`;
        return { name:i, path:path.join(PATH,i) };
    }).map(i=>{
        const name=i.name;
        const list=require(i.path);
        const entityList=parseDbJsonToEntity[name]?parseDbJsonToEntity[name](list):list;
        return domain[name].bulkCreate(entityList);
    });
    return Promise.all(promises);
}

function getFileName(file_path){
    return path.parse(file_path).name;
}

function initSystemResource(routesConfig){
    const flatten_routes=[];
    Object.keys(routesConfig).forEach(k=>{
        const conf=routesConfig[k];
        const {category,files}=conf;
        if(Array.isArray(files) ){
            files.forEach(filePath=>{
                // 当前路由文件的文件名本身
                const fileName=getFileName(filePath);
                // 加载相应路由文件，获取其中定义的路由规则及挂载位置
                const {routes,mount}=require(filePath);
                Object.keys(routes).forEach(name=>{
                    // 一条路由规则的方法名
                    const method=routes[name].method;
                    // 一条路由规则的URL
                    let localUrlPath=routes[name].path;
                    if(localUrlPath[0]='/'){
                        localUrlPath=localUrlPath.slice(1);
                    }
                    flatten_routes.push({ 
                        category, 
                        name:`${fileName}/${name}`,
                        method, 
                        path: url.resolve(mount,localUrlPath),
                    });
                });
            });
        }
    });
    return categoryService.listAll({
        scope:'resource'
    }).then(cateogries=>{
        cateogries.rows.forEach(c=>{
            flatten_routes.forEach(r=>{
                if(r.category==c.name){
                    r.categoryId=c.id;
                }
            });
        });
        return flatten_routes;
    }).then(flatten_routes=>{
        return resourceService.bulkCreate(flatten_routes);
    });
    
}

module.exports={
    checkInstallable,
    install,
    initCoreData,
    createRootUser,
    initPredefinedData,
    initSystemResource,
    createLockFile,
};