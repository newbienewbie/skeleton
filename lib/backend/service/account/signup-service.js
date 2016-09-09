const domain=require('../../domain/domain.js');


/**
 * 生成过期时间
 */
function generateExpiresDate(days=2){
    const date=new Date();
    return date.setTime(date.getTime()+days*24*60*60*1000);
}

/**
 * 检查用户名、Email是否可用
 */
function checkAccountAvailble(username,email){

    return new Promise(function(resolve,reject){
        domain.user.find({
            where: {
                $or: {
                    username: username,
                    email: email,
                }
            }
        }).then(user => {
            if (user) {
                reject('该用户已经存在');
            } else {
                resolve(username);
            }
        })
    });
};


/**
 * 检查邀请码是否有效
 */
function checkInvitationCodeAvaible(activateCode){

    return new Promise(function(resolve,reject){
        
        domain.activeCode.find({
            where: {$and:{
                code: activateCode,
                userId:null 
            } }
        })
        .then(
            activateCode=>{
                if(activateCode && activateCode.expiresAt>new Date()){
                    resolve(activateCode);
                }else{
                    reject("激活码不存在或者已经过期");
                }
            }
        ).catch(e=>{
            console.log(e);
        });
    });
}


/**
 * 创建用户账户
 */
function _createUserAccount(username,password,email,code){
    let userEntity={};
    return domain.user.create({
        username: username,
        password: password,
        email: email,
    }).then(user=>{
        userEntity=user;
        return domain.activeCode.update(
            {userId:user.id},
            {where:{code:code}}
        ).then(()=>{
            return { userEntity,code};
        });
    });
}

/**
 * 处理注册流程
 */
function signup(username,password,email,code){

    return Promise.all([
        checkAccountAvailble(username,email),
        checkInvitationCodeAvaible(code)
    ]).then(
        // 如果校验成功
        ()=>{
            return _createUserAccount(username,password,email,code)
        },
        //如果失败
        (msg)=>{
            return Promise.reject(msg);
        }
    );

}

    

module.exports={generateExpiresDate,checkAccountAvailble,checkInvitationCodeAvaible,signup};