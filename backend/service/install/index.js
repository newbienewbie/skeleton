const fs=require('fs');
const path=require('path');
const domain=require('../../domain');
const signupService=require('../account/signup-service.js');
const roleService=require('../account/role-service.js'); 
const parseDbJsonToEntity=require('./parseDbJsonToEntity');
 
/**
 * 锁定文件的路径 
 */
const lockFilePath=path.join(__dirname,"..","..","install.js.lock");


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
    return checkInstallable()
        .then(()=>{
            return ensureUtf8Database();
        })
        .then(
            ()=>{ return domain.sequelize.sync({ force: true }); },
            (reason)=>{ return Promise.reject(reason); }
        )
        .then(()=>{
            return createLockFile();
        });
}

/**
 * 确保database 是 utf8 字符集
 */
function ensureUtf8Database(){
    const database=domain.sequelize.config.database;
    return domain.sequelize.query(`alter database ${database} character set utf8;`);
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
                const user=info.userEntity;
                const code=info.code;
                let roles=user.roles;
                roles=JSON.parse(roles).concat(['ROLE_ROOT'])
                return roleService.update(username,roles);
            },
            (reason)=>{
                throw reason;
            }
        );
}


/**
 * 初始化数据
 */
function initData(){
    const entityNames=["country","language","role","category","ebook"];
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

module.exports={
    install,
    createRootUser,
    initData,
};