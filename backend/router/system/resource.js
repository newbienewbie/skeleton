const express=require('express');
const bodyParser=require('body-parser');
const resourceService=require('../../service/account/resource-service');
const roleService=require('../../service/account/role-service');
const {Middleware,message}=require('tiny-service');



const router=express.Router();
const middleware=Middleware(resourceService);


router.post('/create',bodyParser.json(),middleware.create);


router.post('/remove',bodyParser.json(),middleware.remove);


router.post('/update',bodyParser.json(),middleware.update);


router.post('/list',bodyParser.json(),middleware.list);


router.post('/recent',bodyParser.json(),middleware.recent);



/**
 * 创建资源，并关联角色
 */
router.post('/create-resource-of-role',bodyParser.json(),function(req,res){
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
});

/**
 * 只移除关联，并不移除角色或者资源
 */
router.post('/remove-resource-of-role',bodyParser.json(),function(req,res){
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
});



router.post('/list-resources-of-role',bodyParser.json(),function(req,res){
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
});


router.post('/whether-resources-associated-with-role',bodyParser.json(),function(req,res){
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
});



router.post('/grant-resource-to-role',bodyParser.json(),function(req,res){
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

});


router.post('/grant-resource-to-role-cancel',bodyParser.json(),function(req,res){
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
});


module.exports=router;