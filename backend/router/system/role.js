const express=require('express');
const bodyParser=require('body-parser');
const {roleService}=require('../../service');
const helper=require('../../utils/helper');
const {Middleware,message}=require('tiny-service');

const middleware=Middleware(roleService);


const router=express.Router();


const jsonMiddleware=bodyParser.json();

const routes={
    'create':{
        method:'post',
        path:'/create',
        middlewares:[jsonMiddleware,preCreate,middleware.create],
    },
    'remove':{
        method:'post',
        path:'/remove',
        middlewares:[jsonMiddleware,preRemove,middleware.remove],
    },
    'update':{
        method:'post',
        path:'/update',
        middlewares:[jsonMiddleware,preUpdate,middleware.update],
    },
    'list':{
        method:'post',
        path:'/list',
        middlewares:[jsonMiddleware,middleware.list],
    },
    'list-of-current-user':{
        method:'post',
        path:'/list-of-current-user',
        middlewares:[jsonMiddleware,listOfCurrentUser],
    },
    'update-roles-of-username':{
        method:'post',
        path:'/update-roles-of-username',
        middlewares:[jsonMiddleware,updateRolesOfUsername],
    }
};


function preCreate(req,res,next){
    const {record}=req.body;
    const {name,description}=record;
    if(!name || !description){
        return res.json(message.fail(`name and description required`));
    }
    next();
}

function preRemove(req,res,next){
    const {id}=req.body;
    if(!id ){
        return res.json(message.fail('id required'));
    }
    next();
}

function preUpdate(req,res,next){
    const {record}=req.body;
    const {id,name,description}=record;
    if(!id || !name ||!description){
        return res.json(message.fail('id , name and description required'));
    }
    next();
}

function listOfCurrentUser(req,res){
    let {page,size,condition}=req.body;
    page=helper.toPositiveInteger(page);
    size=helper.toPositiveInteger(size);
    roleService.listRolesOfUser(req.session.userid,page,size)
        .then((list)=>{
            console.log(list);
        });
}


function updateRolesOfUsername(req,res){
    const info=req.body;
    const username=info.username;
    const roles=info.roles;
    console.log(req.body);
    const result={
        status:'SUCCESS',
        msg:'',
    };
    return roleService.updateRolesOfUsername(username,roles)
        .then(()=>{
            res.end(JSON.stringify(result));
        })
        .catch((e)=>{
            result.status="FAIL";
            result.msg=e;
            res.end(JSON.stringify(result));
        });
}

module.exports={
    mount:'/role',
    routes,
};