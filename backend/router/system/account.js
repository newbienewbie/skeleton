
/**
 * 账号相关的路由器
 */

const domain=require('../../domain');
const {passwordService,signupService,roleService,userService}=require('../../service');
const {sendEmailToActivate}=require('../../service').emailService;
const express=require('express');
const bodyParser=require('body-parser');

const router=express.Router();

/**
 * body-parser urlencoded
 */
const urlencodedMiddleware=bodyParser.urlencoded({extended:true}) ;

/**
 * login page :get
 */
function loginPage(req,res){
    let redirectUrl='/';
    let redirectUrl_encoded='/';
    if(req.query.redirectUrl){
        redirectUrl=decodeURIComponent(req.query.redirectUrl);
        redirectUrl_encoded=encodeURIComponent(redirectUrl);
    }
    let model={
        signInUrl: `/account/login?redirectUrl=${redirectUrl_encoded}`,
        signUpUrl: `/account/signup?redirectUlr=${redirectUrl_encoded}`,
    };
    res.render('login.html',model);
}

/**
 * process the login page submit
 * 处理提交时使用body-parser解析urlencoded参数
 */
function loginProcess(req,res){
    let redirectUrl='/';
    let redirectUrl_encoded='/';
    if(req.query.redirectUrl){
        redirectUrl=decodeURIComponent(req.query.redirectUrl);
        redirectUrl_encoded=encodeURIComponent(req.query.redirectUrl);
    }
    let model={
        signInUrl: `/account/login?redirectUrl=${redirectUrl_encoded}`,
        signUpUrl: `/account/signup?redirectUlr=${redirectUrl_encoded}`,
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
                return roleService.load(userFromDb.username,req).then(_=>{
                    // 重定向
                    res.redirect(redirectUrl);
                    console.log(req.ip,username,req.session.roles,"登陆成功");
                });
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
}

/**
 * sign out
 */
function signOut(req,res){
    req.session.destroy();
    res.send("当前账号已经退出，正为您重定向<meta http-equiv='refresh' content='1;url=/' />");
}

/**
 * 注册,get请求在login.html中显示
 */
function signUpPage(req,res){
    let model={
        signInUrl: "/account/login",
        signUpUrl: "/account/signup",
        regMsg:'',
        errMsg:"", 
    };
    res.render('login.html',model);
}

/**
 * 注册,处理POST提交
 */
function signUpProcess(req,res){
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
}

/**
 * 生成邀请码
 */
function invite(req,res){
    signupService.generateInvitationCode(2)
        .then((activateCode)=>{
            res.end(activateCode.code);
        });
}

/**
 * 列出用户信息
 */
function userList(req,res){
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
        attributes:['id','username','email','state','createdAt','updatedAt'],
        include:["roles"],
    })
    .then(info=>{
        res.end(JSON.stringify(info));
    })
    .catch(e=>{
        console.log(`读取用户列表错误:${e}`);
    });
}

/**
 * 当前用户的profile
 */
function profile(req,res){
    const authorId=req.session.userid;
    if(!authorId){
        res.end(JSON.stringify({}));
        return;
    }
    userService.findById(authorId)
        .then(user=>{
            user=JSON.parse(JSON.stringify(user));
            delete user.password;
            res.end(JSON.stringify(user));
        })
        .catch(e=>{
            console.log(`以id: ${authorId} 读取用户错误`,e);
        });
}


/**
 * 激活用户
 */
function activate(req,res){
    let userId=req.query.u,
    code=req.query.c;
    domain.activeCode.findOne({
        where:{
            userId:userId,
            code:code,
        },
        order:"expiresAt desc",
    }).then(ac=>{
        if(!ac){
            throw new Error("无效 activeCode");
        }
        let userId= ac.userId;
        if(userId){
            return domain.user.update(
                {
                    state:'active'
                },{
                    where:{
                        id:userId,
                        state:{  $ne:'active'}
                    }
                }
            ).then(()=>{
                res.send('激活成功,请登陆');
            });
        }else{
            res.send('找不到该用户');
        }
    }).catch(e=>{
        res.redirect('/404');
    });
}


const routes={
    'login-page':{
        method:'get',
        path:'/',
        middlewares:[ loginPage ],
        allowRoles:['ROLE_ANONYMOUS','ROLE_USER'],
    },
    'login-process':{
        method:'post',
        path:'/login',
        middlewares:[ urlencodedMiddleware,loginProcess ],
        allowRoles:['ROLE_ANONYMOUS','ROLE_USER'],
    },
    'sign-out':{
        method:'get',
        path:'/signout',
        middlewares:[signOut],
        allowRoles:['ROLE_ANONYMOUS','ROLE_USER'],
    },
    'sign-up-page':{
        method:'get',
        path:'/signup',
        middlewares:[signUpPage],
        allowRoles:['ROLE_ANONYMOUS','ROLE_USER'],
    },
    'sign-up-process':{
        method:'post',
        path:'/signup',
        middlewares:[urlencodedMiddleware,signUpProcess],
        allowRoles:['ROLE_ANONYMOUS','ROLE_USER'],
    },
    'invite':{
        method:'get',
        path:'/invite',
        middlewares:[invite]
    },
    'user-list':{
        method:'get',
        path:'/user/list',
        middlewares:[userList],
    },
    'profile-me':{
        method:'get',
        path:'/profile/me',
        middlewares:[profile],
        allowRoles:['ROLE_ANONYMOUS','ROLE_USER'],
    },
    'activate':{
        method:'get',
        path:'/activate',
        middlewares:[activate]
    }
}


module.exports={
    mount:'/account',
    routes,
};