const express=require('express');
const path=require('path');

function register(app){


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
    app.use('/health',require('./sudo/health'));
    app.use('/info',require('./sudo/info'));
    app.use('/install',require('./sudo/install'));


    /////////////// 系统管理相关模块
    app.use('/account',require('./system/account'));
    app.use('/role',require('./system/role'));
    app.use('/resource',require('./system/resource'));


    /////////////// common
    // 上传
    app.use('/upload/meiying',require('./common/upload.js'));
    // 编辑器
    app.use('/ueditor',require('./common/ueditor.js'));
    // 分类
    app.use('/category',require('./common/category'));


    // movie 模块
    app.use('/movie',require('./movie.js'));
    app.use('/country',require('./country.js'));
    app.use('/language',require('./language.js'));

    // post 模块
    app.use('/post',require('./post'));

    // 评论模块
    app.use('/comment',require('./comment'));

    // ebook 模块
    app.use('/ebook',require('./ebook'));


    return app;
}


module.exports=register;