const fs=require('fs');
const path=require('path');
const domain=require('../../domain/domain.js');
const signupService=require('../../service/account/signup-service.js');

 
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
        .then(
            ()=>{ return domain.sequelize.sync({ force: true }); },
            (reason)=>{ return Promise.reject(reason); }
        )
        .then(()=>{
            return createLockFile();
        })
}



/**
 * 创建根用户
 */
function createRootUser(username="root",password="toor",email=""){
    return signupService.generateInvitationCode(1)
        .then( activeCode=>{ 
            return signupService.signup(username,password,email,activeCode.code);
        });
}


module.exports={
    install,
    createRootUser,
};