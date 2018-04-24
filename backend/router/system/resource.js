const express=require('express');
const bodyParser=require('body-parser');
const {resourceService,roleService}=require('../../service');
const {Middleware,message}=require('tiny-service');



const router=express.Router();
const middleware=Middleware(resourceService);
const jsonMiddleware=bodyParser.json();


const routes={
    'create':{
        method:'post',
        path:'/create',
        middlewares:[ jsonMiddleware,middleware.create ],
        allowRoles:['ROLE_SYS_ADMIN',],
    },
    'remove':{
        method:'post',
        path:'/remove',
        middlewares:[ jsonMiddleware,middleware.remove ],
        allowRoles:['ROLE_SYS_ADMIN',],
    },
    'update':{
        method:'post',
        path:'/update',
        middlewares:[ jsonMiddleware,middleware.update ],
        allowRoles:['ROLE_SYS_ADMIN',],
    },
    'list':{
        method:'post',
        path:'/list',
        middlewares:[ jsonMiddleware,middleware.list ],
    },
    'recent':{
        method:'post',
        path:'/recent',
        middlewares:[ jsonMiddleware,middleware.recent ],
    },
    'create-resource-of-role':{
        method:'post',
        path:'/create-resource-of-role',
        middlewares:[ jsonMiddleware,createResourceOfRole ],
        allowRoles:['ROLE_SYS_ADMIN',],
    },
    'remove-resource-of-role':{
        method:'post',
        path:'/remove-resource-of-role',
        middlewares:[ jsonMiddleware,removeResourceOfRole],
        allowRoles:['ROLE_SYS_ADMIN',],
    },
    'list-resources-of-role':{
        method:'post',
        path:'/list-resources-of-role',
        middlewares:[ jsonMiddleware,listResourcesOfRole],
    },
    'whether-resources-associated-with-role':{
        method:'post',
        path:'/whether-resources-associated-with-role',
        middlewares:[ jsonMiddleware,whetherResourcesAssociatedWithRole],
        allowRoles:['ROLE_SYS_ADMIN',],
    },
    'grant-resource-to-role':{
        method:'post',
        path:'/grant-resource-to-role',
        middlewares:[ jsonMiddleware,grantResourceToRole],
        allowRoles:['ROLE_SYS_ADMIN',],
    },
    'grant-resource-to-role-cancel':{
        method:'post',
        path:'/grant-resource-to-role-cancel',
        middlewares:[ jsonMiddleware,grantResourceToRoleCancel],
        allowRoles:['ROLE_SYS_ADMIN',],
    },
};


/**
 * 创建资源，并关联角色
 */
function createResourceOfRole(req,res){
    const {record,context}=req.body;
    const {headItem}=context;
    const roleId=headItem.id;

    resourceService.createResourceOfRole(roleId,record)
        .then(
            _=>{
                res.json(message.success());
            },
            r=>{
                res.json(message.fail(r));
            }
        );
}

/**
 * 只移除关联，并不移除角色或者资源
 */
function removeResourceOfRole(req,res){
    const {record,context}=req.body;
    const {headItem}=context;
    if(!headItem.id){
        res.json(message.fail('context.headItem.id required'));
        return;
    }

    const {id}=record;
    const roleId=headItem.id;
    resourceService.removeResourceOfUser(roleId,{id})
        .then(
            _=>{
                res.json(message.success());
            },
            r=>{
                res.json(message.fail(r));
            }
        );
}



function listResourcesOfRole(req,res){
    const {page,size,condition,context}=req.body;
    if(!context || !context.headItem ||!context.headItem.id){
        res.json({
            counts:0,
            rows:[],
        });
        return;
    }
    const roleId=context.headItem.id;
    return resourceService.listResourcesOfRole(roleId,page,size,condition)
        .then(resources=>{
            res.json(resources);
        });
}


function whetherResourcesAssociatedWithRole(req,res){
    const {resourceIds,context}=req.body;
    if(!context || !context.headItem ||!context.headItem.id){
        res.json([]);
        return;
    }
    // resourceIds is like [2,5,6,8,...]
    if(!Array.isArray(resourceIds || resourceIds.length==0)){
        res.json([]);
        return;
    }

    const roleId=context.headItem.id;
    return resourceService.whetherResourcesAssociatedWithRole(roleId,resourceIds)
        .then(result=> res.json(result) );
}



function grantResourceToRole(req,res){
    const {resourceId,context}=req.body;
    if(!context || !context.headItem ||!context.headItem.id){
        res.json(message.fail(`context.headItem.id required`));
        return;
    }
    if(!resourceId){
        res.json(message.fail(`resourceId required`));
        return;
    }
    const roleId=context.headItem.id;
    return resourceService.grantResourceToRole(roleId,resourceId)
        .then(result=>res.json(result));

}


function grantResourceToRoleCancel(req,res){
    const {resourceId,context}=req.body;
    if(!context || !context.headItem ||!context.headItem.id){
        res.json(message.fail(`context.headItem.id required`));
        return;
    }
    if(!resourceId){
        res.json(message.fail(`resourceId required`));
        return;
    }
    const roleId=context.headItem.id;
    return resourceService.grantResourceToRoleCancel(roleId,resourceId)
        .then(result=>res.json(result))
}

module.exports={
    mount:'/resource',
    routes,
};