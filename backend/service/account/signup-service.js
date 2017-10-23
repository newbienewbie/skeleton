const domain=require('../../domain');
const passwordService=require('./password-service');
const roleService=require('./role-service');

/**
 * 生成过期时间
 */
function generateExpiresDate(days=2){
    const date=new Date();
    return date.setTime(date.getTime()+days*24*60*60*1000);
}


/**
 * 生成邀请码
 */
function generateInvitationCode(days=2){
    return domain.activeCode.create({
        expiresAt:generateExpiresDate(days),
    });
}

/**
 * 检查用户名、Email是否可用
 */
function checkAccountAvailble(username,email){

    return domain.user.find({
            where: {
                $or: {
                    username: username,
                    email: email,
                }
            }
        })
        .then(user => {
            if (user) {
                return Promise.reject('该用户已经存在');
            } else {
                return Promise.resolve(username);
            }
        });
};


/**
 * 检查邀请码是否有效
 */
function checkInvitationCodeAvaible(activateCode){
        
    return domain.activeCode.find({
            where: {$and:{
                code: activateCode,
                userId:null 
            } }
        })
        .then( activateCode=>{
            if(activateCode && activateCode.expiresAt>new Date()){
                return Promise.resolve(activateCode);
            }else{
                return Promise.reject("激活码不存在或者已经过期");
            }
        });
}


/**
 * 创建用户账户
 */
function _createUserAccount(username,password,email,code,state="active"){
    let userEntity={};
    let cipher="";
    return passwordService.generate(password)
        .then(pass=>{
            cipher=pass;
        })
        .then(()=>{
            password=""; //尽快清空password
            return domain.user.create({
                username: username,
                password: cipher,
                email: email,
                state: state
            });
        }).then(user => {
            userEntity = user;
            return domain.activeCode.update(
                { userId: user.id },
                { where: { code: code } }
            );
        }).then(() => {
            return { userEntity, code };
        });; 
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
            // 创建用户
            return _createUserAccount(username,password,email,code)
                .then(result=>{
                    const {userEntity,code}=result;
                    // 为该用户添加“普通用户"这一角色
                    return roleService.findByName("普通用户")
                        .then(role=>{
                            if(!role){ return roleService.createRole("普通用户","普通用户"); }
                            return role;
                        })
                        .then(role=> roleService.addRolesForUser(userEntity.id,[3]))
                        .then(_=>{
                            return result;
                        })
                        ;
                })
        },
        //如果失败
        (msg)=>{
            return Promise.reject(msg);
        }
    );

}

    

module.exports={
    generateExpiresDate,
    generateInvitationCode,
    checkAccountAvailble,
    checkInvitationCodeAvaible,
    signup
};