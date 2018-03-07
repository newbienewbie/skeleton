const path=require('path');
const http= require('http');
const nunjucks=require('nunjucks');
const moment=require('moment');
const config=require('./backend/config');
const defaultConfig=require('./config');
const express=require('express');


class Skeleton{

    constructor(opts={config:{}}){
        // set the config
        config.setConfig(opts.config|| defaultConfig);
        this.config=config.getConfig();

        // and then dynamic import the backend
        const {register,service,domain}=require('./backend');
        this.register=register;
        this.service=service;
        this.domain=domain;

        this.app=express();
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

        // register routes
        this.register(app);
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