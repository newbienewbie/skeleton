const fs=require('fs');
const path=require('path');
const {installService}=require('../../service');
const domain=require('../../domain');
const express=require('express');
const bodyParser=require('body-parser');



var router=express.Router();


const installable=function(req,res,next){
    installService.checkInstallable().then(
        _=>{ next() },
        reason=>{ res.json({ status:'FAIL', msg:reason, }); }
    );
};

/**
 * 安装网站之：创建数据库
 */
router.get('/create-db',installable,
    function(req,res){
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
);

/**
 * 初始化核心基础表
 */
router.post('/init-core',installable,function(req,res,next){
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
});


/**
 * 安装网站之：创建根用户
 */
router.post('/create-root-user',installable,bodyParser.json(),function(req,res){
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
});


router.post('/init-db',installable,function(req,res,next){
    const info={ status:'SUCCESS', msg:'', }; 
    installService.initPredefinedData()
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
});

/**
 * 安装网站之：显示模板文件
 */
router.get('/',(req,res)=>{
    res.render('install.html',{});
});



module.exports=router;