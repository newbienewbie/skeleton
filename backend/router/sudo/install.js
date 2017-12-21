const fs=require('fs');
const path=require('path');
const {installService}=require('../../service');
const domain=require('../../domain');
const express=require('express');
const bodyParser=require('body-parser');
const routesConfig=require('../routes.config');



const jsonMiddleware=bodyParser.json();
const installable=function(req,res,next){
    installService.checkInstallable().then(
        _=>{ next() },
        reason=>{ res.json({ status:'FAIL', msg:reason, }); }
    );
};

/**
 * 安装网站之：创建数据库
 */
function createDb(req,res){
    installService.install()
        .then(
            ()=>{
                res.end(JSON.stringify({
                    status:'SUCCESS', msg:'',
                }));
            },
            (reason)=>{
                console.log(reason);
                res.end(JSON.stringify({
                    status:'FAIL', msg:reason,
                }));
            }
        );
}

/**
 * 初始化核心基础表
 */
function initCore(req,res,next){
    const info={ status:'SUCCESS', msg:'', }; 
    installService.initCoreData()
        .then(
            ()=>{
                res.end(JSON.stringify(info));
            },
            (reason)=>{
                info.status="FAIL";
                info.msg=reason;
                res.end(JSON.stringify(info));
            }
        ).catch(e=>{
            info.status="FAIL";
            info.msg=e;
            res.end(JSON.stringify(info));
        });
}

/**
 * 安装网站之：创建根用户
 */
function createRootUser(req,res){
    const root=req.body;
    let username=root.username;
    username=username?username:"root";
    let password=root.password;
    password=password?password:"toor";
    let email=root.email; 
    email=email?email:"itminus@163.com";

    const info={ status:'SUCCESS', msg:'', };
    installService.createRootUser(username,password,email)
        .then(
            ()=>{
                res.end(JSON.stringify(info));
            },
            (reason)=>{
                console.log(reason);
                info.status='FAIL'; 
                info.msg=reason,
                res.end(JSON.stringify(info));
            }
        );
}

function initDb(req,res,next){
    const info={ status:'SUCCESS', msg:'', }; 
    installService.initPredefinedData()
        .then(_=>{
            return installService.initSystemResource(routesConfig)
        })
        .then(_=>{
            return installService.initResourceRoles(routesConfig)
        })
        .then(_=>installService.createLockFile())
        .then(
            ()=>{
                res.end(JSON.stringify(info));
            },
            (reason)=>{
                info.status="FAIL";
                info.msg=reason;
                res.end(JSON.stringify(info));
            }
        ).catch(e=>{
            info.status="FAIL";
            info.msg=e;
            res.end(JSON.stringify(info));
        });
}

/**
 * 安装网站之：显示模板文件
 */
function showInstallPage(req,res){
    res.render('install.html',{});
}

const routes={
    'create-db':{
        method:'get',
        path:'/create-db',
        middlewares:[ installable,createDb],
    },
    'init-core':{
        method:'post',
        path:'/init-core',
        middlewares:[ installable,initCore],
    },
    'create-root-user':{
        method:'post',
        path:'/create-root-user',
        middlewares:[ installable,jsonMiddleware,createRootUser ],
    },
    'init-db':{
        method:'post',
        path:'/init-db',
        middlewares:[ installable, initDb ],
    },
    'show-install-page':{
        method:'get',
        path:'/',
        middlewares:[ showInstallPage ],
    },
};



module.exports={
    mount:'/install',
    routes,
};