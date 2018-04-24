const path=require('path');
const http= require('http');
const nunjucks=require('nunjucks');
const moment=require('moment');
const config=require('./backend/config');
const defaultConfig=require('./config');
const express=require('express');


class Skeleton{

    /**
     * 构造一个Skeleton
     * @param {*} opts 
     * @param {*} opts.config 参见 config/index.js 返回的 config 对象
     * @param {*} opts.routes 参见 backend/router/route.rules.js返回的 routeRules对象
     */
    constructor(opts={ config:{},routes:null }){
        // set the config
        config.setConfig(opts.config|| defaultConfig);
        this.config=config.getConfig();

        /**
         * 路由规则对象
         */
        this.routes=opts.routes || {};  

        // and then dynamic import the backend
        const {register,service,domain}=require('./backend');

        /**
         * 注册器
         */
        this.register=register;
        /**
         * 服务
         */
        this.service=service;
        /**
         * 领域模型
         */
        this.domain=domain;

        /**
         * 如何处理req-res模型的app
         */
        this.app=express();
        /**
         * 静态文件处理器
         */
        this.staticHandle=express.static;
    }



    /**
     * hook
     */
    beforeRun(){
        const app=this.app;
        const basePath=this.config.basePath;
        // 配置模板
        let env =nunjucks.configure(basePath.views,{
            noCache:this.config.env=="prod"?false:true,
            express:app,
            autoescape:true,
        });
        env.addGlobal('moment',moment);

        // serve static files
        this.serveStaticFiles();

        this.serverDynamic();
    }

    /**
     * serve static files ,should be overwritten by subclass
     */
    serveStaticFiles(){
        if(this.config.env=="prod"){
            console.warn(`the default serveStaticFiles() method is used for development only ,you should overwirte it!`);
        }
        const app=this.app;
        const basePath=this.config.basePath

        // 上传的文件，令可访问
        app.use('/upload',this.staticHandle(path.join(process.cwd(),"upload")));

        // 静态文件，如css、js、html等
        basePath.assets.forEach(p=>{
            app.use('/static',this.staticHandle(p));
        });

        // ebook文件
        app.use('/ebook-init-files',this.staticHandle(basePath.ebooks));
    }

    /**
     * serve dynamic request , could be overwritten by subclass
     */
    serverDynamic(){
        // register routes : plugins
        if(this.routes){
            this.register(this.app,this.routes);
        }
        // register routes : built-in
        this.register(this.app);
    }

    /**
     * hook
     * @param {httpServer} server 
     * @param {Number} port 
     * @param {String} ip 
     */
    afterRun(server,port,ip){
        console.log(`Application worker ${process.pid} started on ${ip}:${port}...`);
    }

    /**
     * start the web server 
     */
    run(){
        this.beforeRun();
        const env= process.env;
        const server = http.createServer(this.app);
        // 如不加'0.0.0.0',在多网卡的服务器上，可能会无法监听合适的网段。
        const ip=env.NODE_IP || '0.0.0.0';
        const port=env.NODE_PORT || 3000;
        
        server.listen(port,ip, ()=>{
            this.afterRun(server,port,ip);
        });
    }

}




module.exports=Skeleton;