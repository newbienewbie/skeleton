const express=require('express');
const path=require('path');
const routesConfig=require('./routes.config');

/**
 * 注册单个Route文件
 * @param {*} app 
 * @param {String} filePath 文件路径
 */
function registerRouteFile(app,filePath){

    const router=express.Router();

    // 加载路由模块
    const mod=require(filePath);
    const {routes,mount}=mod;
    Object.keys(routes).forEach(r=>{
        const {method,path,middlewares}=routes[r];
        middlewares.forEach(mw=>{
            router[method](path,mw);
        });
    });
    app.use(mount,router);
}

function register(app){

    /////////////// session
    app.use('/',require('./session'));

    Object.keys(routesConfig).forEach(k=>{
        const config=routesConfig[k];
        const {category,files}=config;
        files.forEach(p=>registerRouteFile(app,p));
    });

    return app;
}


module.exports=register;