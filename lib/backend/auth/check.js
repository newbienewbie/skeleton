/**
 * 检查用户是否登陆、是否拥有指定角色的一套检查函数（生成中间件函数）
 * 目前的实现依赖于session，要求：
 * * username 
 * * roles 
 * 存储于session之中
 */

const hasSignedIn=require('./has-signed-in.js');



/**
 * 高阶函数，返回一个中间件,用于检查是否登陆
 */
function checkLogin() {

    return (req,res,next)=>{
        if(hasSignedIn(req)){
            next();
        }else{
            //res.redirect("/");
            res.send('您尚未登陆，即将为您转向登陆<meta http-equiv="refresh" content="1;url=/"/>');
        }
    };
}


/** 
 * 高阶函数，返回一个中间件,用于检查是否拥有指定角色
 */
function checkRole(ROLE_STR) {

        return (req,res,next)=>{
            let roles=req.session.roles||[];
            if(roles.indexOf(ROLE_STR)!=-1){
                next();
            }else{
                res.send('您无此权限，即将为您从定向<meta http-equiv="refresh" content="1;url=/"/>');
            }
        };
}


/**
 * 高阶函数，返回一个中间件,用于检查是否拥有指定角色之一
 */
function checkAnyRole(ROLES_ARRAY) {

    return (req,res,next)=>{
        let roles=req.session.roles||[];
        let accessable=false;
        for(let i=0;i<roles.length;i++){
            if(ROLES_ARRAY.indexOf(roles[i])!==-1){
                accessable=true;
                break;
            }
        }
        if(accessable==true){
            next();
        }else{
            res.send('您无此权限，即将为您从定向<meta http-equiv="refresh" content="1;url=/"/>');
        }
    };
    
}


/**
 * 高阶函数，返回一个中间件,用于检查是否拥有指定的所有角色
 */
function checkAllRoles(ROLES_ARRAY) {
    return (req, res, next) => {
        let roles=req.session.roles||[];
        let accessable = true;
        for (let i = 0; i < ROLES_ARRAY.length; i++) {
            if (roles.indexOf(ROLES_ARRAY[i]) == -1) {
                accessable = false;
                break;
            }
        }
        if (accessable == true) {
            next();
        } else {
            res.send('您无此权限，即将为您从定向<meta http-equiv="refresh" content="1;url=/"/>');
        }
    };
}



module.exports={
    checkLogin:checkLogin,
    checkRole:checkRole,
    checkAnyRole:checkAnyRole,
    checkAllRoles:checkAllRoles
};