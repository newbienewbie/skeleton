const express=require('express');
const path=require('path');
const _routeRules=require('./route.rules');
const {AuthInterceptor,AuthorizationInterceptor}=require('express-security');
const resourceService=require('../service/account/resource-service');
const pathToRegExp=require('path-to-regexp');
const {getFileName,getResourceName,shouldPassBy}=require('../service/utils');
const {message}=require('tiny-service');
const roleService=require('../service/account/role-service');

function rolesAccessor(req) {
    let roles= req.session.roles;
    return roles;
}
const roleFailMsg=message.fail(`unauthorized`);
const interceptor=new AuthorizationInterceptor(rolesAccessor,roleFailMsg);

/**
 * 注册单个Route文件
 * @param {*} app 
 * @param {String} filePath 文件路径
 */
function registerRouteFile(app,filePath){

    const router=express.Router();

    const fileName=getFileName(filePath);
    // 加载路由模块
    const mod=require(filePath);
    const {routes,mount}=mod;
    Object.keys(routes).forEach(r=>{

        // 添加权限校验中间件
        /**
         * 当前资源名
         */
        const resourceName=getResourceName(fileName,r);
        /**
         * 当前路由的方法、路径、和中间件
         */
        const {method,path,middlewares}=routes[r];

        // 安装、登陆、登出、注册等模块的访问无身份限制
        if(!shouldPassBy(resourceName)){
            const authorizationMw=interceptor.requireTrue(req=>{
                const userid=req.session.userid;
                const roleNames=req.session.roles;
    
                // 超级用户
                if(userid==1){ return Promise.resolve(true); }
                // 超级用户角色
                if( roleNames.some(r=> r.name && r.name == "ROLE_ROOT") ){ return Promise.resolve(true); }
    
                return resourceService.findByName(resourceName)
                    .then(resource=>{
                        for(let i=0;i<resource.roles.length;i++){
                            const roleName=resource.roles[i].name;
                            const flag=roleNames.some(r=>r.name===roleName ) ;
                            if( flag){ 
                                return true; 
                            }
                        }
                        return false;
                    });
            });
            middlewares.unshift(authorizationMw);
        }

        middlewares.forEach(mw=>{ router[method](path,mw); });
    });
    app.use(mount,router);
}


/**
 * 为app注册路由规则
 * @param {*} app 
 * @param {*} routeRules 
 */
function register(app,routeRules=_routeRules){

    // session
    app.use('/',require('./session'));

    return roleService.findByName('ROLE_ANONYMOUS')
        .then(anonymousRole=>{
            return anonymousRole;
        })
        .catch(e=>{
            return "ROLE_ANONYMOUS";
        })
        .then(anonymousRole=>{
            // 为匿名用户设置当前角色为`ROLE_ANONYMOUS`
            app.use('/',function(req,res,next){
                if(!req.session.roles){ 
                    req.session.roles=[anonymousRole]; 
                }
                next(); 
            });
            Object.keys(routeRules).forEach(k=>{
                const config=routeRules[k];
                const {category,files}=config;
                files.forEach(p=>registerRouteFile(app,p));
            });
            return app;
        });

}


module.exports=register;