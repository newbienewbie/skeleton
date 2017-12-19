const express=require('express');
const path=require('path');

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

    /////////////// pages
    // home page
    app.use('/',require('./page/home.js'));
    // dashboard page
    app.use('/dashboard',require('./page/dashboard.js'));
    // about page
    app.use('/about',require('./page/about'));
    // contact page
    app.use('/contact',require('./page/contact'));
    // 404 page
    app.use('/404',require('./page/not-found.js'));


    /////////////// 超级管理模块
    [
        './sudo/health',
        './sudo/info',
        './sudo/install',
    ].forEach(p=> registerRouteFile(app,p));


    /////////////// 系统管理相关模块
    [
        './system/account',
        './system/role',
        './system/resource',
    ].forEach(p=> registerRouteFile(app,p))


    /////////////// common
    // 上传
    app.use('/upload/meiying',require('./common/upload.js'));
    // 编辑器
    app.use('/ueditor',require('./common/ueditor.js'));
    // 分类
    app.use('/category',require('./common/category'));
    // 国家地区
    app.use('/country',require('./common/country.js'));
    // 语言
    app.use('/language',require('./common/language.js'));


    /////////////// cms 模块
    // movie 模块
    app.use('/movie',require('./cms/movie.js'));
    // post 模块
    app.use('/post',require('./cms/post'));
    // ebook 模块
    app.use('/ebook',require('./cms/ebook'));



    // 评论模块
    app.use('/comment',require('./comment'));


    return app;
}


module.exports=register;