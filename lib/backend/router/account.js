/**
 * 账号相关的路由器
 */

const domain=require('../domain/domain.js');
const hasSignedIn=require('../service/auth/has-signed-in.js');
const passwordService=require('../service/auth/password-service.js');
const sendEmailToActivate=require('../service/email/send-email-to-activate.js');
const signupService=require('../service/account/signup-service.js');
const express=require('express');
const bodyParser=require('body-parser');



const router=express.Router();

/**
 * login page :get
 */
router.get('/',(req,res)=>{
    let model={
        signInUrl:"/account/login",
        signUpUrl:"/account/signup",
    };
    if(hasSignedIn(req)){
        res.redirect(req.query.redirect || "/");
    }else{
        res.render("login.html",model);
    };
});

/**
 * process the login page submit
 * 处理提交时使用body-parser解析urlencoded参数
 */
router.post('/login',bodyParser.urlencoded({extended:true}) ,(req,res)=>{
    let model={
        signInUrl: "/account/login",
        signUpUrl: "/account/signup",
        errMsg:'用户名及密码不得为空',
    };
    let username=req.body.username;
    let password=req.body.password;
    let userFromDb=null;
    if(username && password){
        domain.user.find({
            where:{
                username:username
            }
        }).then((user)=>{
            if(user && ["active","shutup"].indexOf(user.state)!=-1){
                userFromDb=user;
                return passwordService.compare(password,user.password);
            }else{
                return Promise.reject("该用户尚未激活");
            }
        }).then((result)=>{
            if(result){
                // 设置session
                req.session.username=userFromDb.username;
                req.session.roles=JSON.parse(userFromDb.roles)||[];
                // 重定向
                res.redirect('/');
                console.log(req.ip,username,"登陆成功");
            }else{
                model.errMsg='密码输入错误',
                res.render('login.html',model);
                console.log(req.ip,username,'登陆失败');
            }
        }).catch((e)=>{
            //账号没找到，或者数据库没连上
            model.errMsg='无法获取账号信息';
            res.render('login.html',model);
            console.log(req.ip,username,e);
        });
    }else{
        res.render('login.html',model);
    }
});


/**
 * 登出
 */
router.get('/signout',(req,res)=>{
    req.session.destroy();
    res.send("当前账号已经退出，正为您重定向<meta http-equiv='refresh' content='1;url=/' />");
});


/**
 * 注册,get请求在login.html中显示
 */
router.get('/signup',(req,res)=>{
    let model={
        signInUrl: "/account/login",
        signUpUrl: "/account/signup",
        regMsg:'',
        errMsg:"", 
    };
    res.render('login.html',model);
});

/**
 * 注册,处理POST提交
 */
router.post("/signup",bodyParser.urlencoded({extended:true}),(req,res)=>{
    let model={
        signInUrl: "/account/login",
        signUpUrl: "/account/signup",
        regMsg:'',
        errMsg:"", 
    };
    let username=req.body.username;
    let password=req.body.password;
    let email=req.body.email;
    let invitation=req.body.invitation;

    signupService.signup(username,password,email,invitation)
        .then(
            (info)=>{
                console.log("注册成功：",info.userEntity.username,req.ip);
                model.errMsg='请登录邮箱激活验证';
                res.render("login.html",model);
            },
            (msg)=>{
                model.regMsg=msg;
                res.render('login.html',model);
            }
        );
    
});

router.get('/invite',(req,res)=>{
    signupService.generateInvitationCode(2)
        .then((activateCode)=>{
            res.end(activateCode.code);
        });
});



/**
 * 列出用户信息
 */
router.get('/user/list',function(req,res){
    let page=parseInt(req.query.page?req.query.page:1);
    page=page>0?page:1;
    let size=parseInt(req.query.size?req.query.size:10);
    size=size>0?size:5;

    domain.user.findAndCountAll({
        offset:(page-1)*size,
        limit:size,
        order:[
            ['id','desc'],
        ],
        attributes:['id','username','email','roles','state','createdAt','updatedAt'],
    })
    .then(info=>{
        res.end(JSON.stringify(info));
    })
    .catch(e=>{
        console.log(`读取用户列表错误:${e}`);
    });


});

/**
 * 激活用户
 */
// router.get('/activate',(req,res)=>{
//     let  userId=req.query.u,
//          code=req.query.c;
//     domain.activeCode.findOne({
//         where:{
//             userId:userId,
//             code:code,
//         },
//         order:"expiresAt desc",
//     }).then(ac=>{
//         if(!ac){
//             throw new Error("无效 activeCode");
//         }
//         let userId= ac.userId;
//         if(userId){
//             return domain.user.update(
//                 {
//                     state:'active'
//                 },{
//                     where:{
//                         id:userId,
//                         state:{  $ne:'active'}
//                     }
//                 }
//             ).then(()=>{
//                 res.send('激活成功,请登陆');
//             });
//         }else{
//             res.send('找不到该用户');
//         }
//     }).catch(e=>{
//         res.redirect('/404');
//     });
// });



module.exports=router;