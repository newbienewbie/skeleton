const path=require('path');
const express=require('express');
const nunjucks=require('nunjucks');
const moment=require('moment');
const sess=require('./service/session/session.js');
const config=require("./config").getConfig();


function createApp(opts){

    const FRONT_END_PATH=path.join(__dirname,'../frontend');
    // 配置app
    let app=express();
    
    // 配置模板
    let env =nunjucks.configure(path.join(FRONT_END_PATH,'views'),{
        noCache:true,
        express:app,
        autoescape:true
    });

    env.addGlobal('moment',moment);
    
    // 配置session
    app.use(sess);
    
    // 首页
    app.use('/',require('./router/index.js'));
    
    // 静态文件如css、js、html等
    app.use('/static',express.static(path.join(FRONT_END_PATH,"static")));
    // ebook 初始化文件的路径
    app.use('/ebook-init-files',express.static(path.join(config.ebook.initFilesPath)));
    
    // 超级管理模块
    app.use('/health',require('./router/sudo/health.js'));
    app.use('/info',require('./router/sudo/info.js'));
    app.use('/install',require('./router/sudo/install.js'));
    
    // 后台
    app.use('/dashboard',require('./router/dashboard.js'));
    
    // 账号相关模块
    app.use('/account',require('./router/account.js'));
    // 角色管理模块
    app.use('/role',require('./router/role.js'));
    app.use('/resource',require('./router/resource'));
    
    app.use('/404',require('./router/not-found.js'));
    
    app.use('/ueditor',require('./router/ueditor.js'));
    app.use('/upload',express.static(path.join(__dirname,"..","upload")));
    
    // domain 相关
    app.use('/upload/meiying',require('./router/upload.js'));
    app.use('/country',require('./router/country.js'));
    app.use('/language',require('./router/language.js'));
    app.use('/movie',require('./router/movie.js'));
    
    // post 模块
    app.use('/post',require('./router/post'));
    app.use('/category',require('./router/category'));
    app.use('/comment',require('./router/comment'));
    app.use('/contact',require('./router/contact'));
    
    
    // ebook 模块
    app.use('/ebook',require('./router/ebook'));

    // about 模块
    app.use('/about',require('./router/about'));

    // 返回 app
    return app;
}
//导出app，用于http.createServer(app)
module.exports={createApp};
