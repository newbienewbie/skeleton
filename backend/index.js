const path=require('path');
const express=require('express');
const nunjucks=require('nunjucks');
const moment=require('moment');
const sess=require('./service/session/session.js');
const config=require("./config").getConfig();
const register=require('./router');


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
    
    // 静态文件如css、js、html等
    app.use('/static',express.static(path.join(FRONT_END_PATH,"static")));
    // ebook 初始化文件的路径
    app.use('/ebook-init-files',express.static(path.join(config.ebook.initFilesPath)));
    // 上传文件可访问
    app.use('/upload',express.static(path.join(__dirname,"..","upload")));

    register(app);
    
    // 返回 app
    return app;
}
//导出app，用于http.createServer(app)
module.exports={createApp};
