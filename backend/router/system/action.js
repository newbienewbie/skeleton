const bodyParser=require('body-parser');
const {Middleware,message,CategoryMiddleware}=require('tiny-service');
const {actionService}=require('../../service');


const jsonMiddleware=bodyParser.json();
const middleware=Middleware(actionService);

middleware.tree=function(req,res,next){
    const condition={};
    const {scope}=req.body;
    if(scope){
        condition.scope=scope;
    }
    return actionService.tree(condition)
        .then(list=>{ res.json(list); });
};


const routes={
    'create':{
        method:'post',
        path:'/create',
        middlewares:[ jsonMiddleware,middleware.create ],
        allowRoles:['ROLE_ADMIN',],
    },
    'remove':{
        method:'post',
        path:'/remove',
        middlewares:[ jsonMiddleware,middleware.remove ],
        allowRoles:['ROLE_ADMIN',],
    },
    'update':{
        method:'post',
        path:'/update',
        middlewares:[ jsonMiddleware,middleware.update ],
        allowRoles:['ROLE_ADMIN',],
    },
    'list':{
        method:'post',
        path:'/list',
        middlewares:[ jsonMiddleware,middleware.list ],
    },
    'tree':{
        method:'post',
        path:'/tree',
        middlewares:[ jsonMiddleware,middleware.tree],
    },
};


module.exports={
    mount:'/action',
    routes,
};