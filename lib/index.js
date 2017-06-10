const path=require('path');
const sess=require('./backend/service/session/session.js');
const config=require("./backend/config").getConfig();
const express=require('express');
const nunjucks=require('nunjucks');


function createApp(opts){

    // 配置app
    let app=express();
    
    // 配置模板
    nunjucks.configure('frontend/views',{
        express:app,
        autoescape:true
    });
    
    // 配置session
    app.use(sess);
    
    // 首页
    app.use('/',require('./backend/router/index.js'));
    
    // 静态文件如css、js、html等
    app.use('/static',express.static(path.join(__dirname,"..","frontend","static")));
    // ebook 初始化文件的路径
    app.use('/ebook-init-files',express.static(path.join(config.ebook.initFilesPath)));
    
    // 超级管理模块
    app.use('/health',require('./backend/router/sudo/health.js'));
    app.use('/info',require('./backend/router/sudo/info.js'));
    app.use('/install',require('./backend/router/sudo/install.js'));
    
    // 后台
    app.use('/dashboard',require('./backend/router/dashboard.js'));
    
    // 账号相关模块
    app.use('/account',require('./backend/router/account.js'));
    // 角色管理模块
    app.use('/role',require('./backend/router/role.js'));
    
    app.use('/404',require('./backend/router/not-found.js'));
    
    app.use('/ueditor',require('./backend/router/ueditor.js'));
    app.use('/upload',express.static(path.join(__dirname,"..","upload")));
    
    // domain 相关
    app.use('/upload/meiying',require('./backend/router/domain/upload.js'));
    app.use('/country',require('./backend/router/domain/country.js'));
    app.use('/language',require('./backend/router/domain/language.js'));
    app.use('/movie',require('./backend/router/domain/movie.js'));
    
    // post 模块
    app.use('/post',require('./backend/router/post'));
    app.use('/category',require('./backend/router/category'));
    app.use('/comment',require('./backend/router/comment'));
    
    
    // ebook 模块
    app.use('/ebook',require('./backend/router/ebook'));

    // 返回 app
    return app;
}
//导出app，用于http.createServer(app)
module.exports={createApp};
