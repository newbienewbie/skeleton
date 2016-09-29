const path=require('path');
const sess=require('./backend/service/session/session.js');
const config=require('./backend/config/config.js');
const express=require('express');
const nunjucks=require('nunjucks');



// 配置app
let app=express();

// 配置模板
nunjucks.configure('lib/frontend/views',{
    express:app,
    autoescape:true
});

// 配置session
app.use(sess);

// 首页
app.use('/',require('./backend/router/index.js'));

// 静态文件如css、js、html等
app.use('/static',express.static(path.join(__dirname,"frontend","static")));

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
app.use('/api/post',require('./backend/router/post.js'));

app.use('/ueditor',require('./backend/router/ueditor.js'));
app.use('/upload',express.static(path.join(__dirname,"..","upload")));

// domain 相关
app.use('/upload/meiying',require('./backend/router/domain/upload.js'));
app.use('/country',require('./backend/router/domain/country.js'));
app.use('/language',require('./backend/router/domain/language.js'));
app.use('/movie',require('./backend/router/domain/movie.js'));

//导出app，用于http.createServer(app)
module.exports=app;
