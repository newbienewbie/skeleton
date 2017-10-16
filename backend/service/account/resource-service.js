const {Service,message}=require('tiny-service');
const domain=require('../../domain');

const roleService=require('./role-service');
const resourceService=Service(domain.resource);



/**
 * 获取某个角色获得授权的资源列表
 * @param {Number} roleId 
 * @param {Number} page 
 * @param {Number} size 
 * @param {Object} condition 
 */
resourceService.listResourcesOfRole= function listResourcesOfRole(roleId,page=1,size=8,condition={}){

    return domain.resource.findAndCount({
        where:condition,
        offset:(page-1)*size,
        limit:size,
        include:[
            {
                model:domain.role,
                required:true,
                through:{
                    where:{ 
                        roleId:roleId, 
                    }
                },
            }
        ],
    });
}
    

/**
 * 创建资源，添加角色-资源关联
 */
resourceService.createResourceOfRole=function(roleId,resource){
    return Promise.all([
            domain.role.findById(roleId),
            domain.resource.create(resource),
        ])
        .then(result=>{
            const role=result[0];
            const resource=result[1];
            if(role){
                return role.addResource(resource,{through:{  }});
            }else{
                return Promise.reject(`role with id ${roleId} not found`);
            }
        });
}



/**
 * 取消角色已授权的资源的关联关系，并不删除角色或者资源
 */
resourceService.removeResourceOfRole=function(roleId,resource){
    return domain.resource.findById(resource.id)
        .then(resource=>{
            return resource.removeRole(roleId);
        });
}



/**
 * 为角色授权资源列表
 * @param {Integer} userId 
 * @param {Array} roles 
 */
resourceService.updateResourcesOfRole=function updateResourcesOfRole(roleId,resources=[]){
    return domain.role.findById(roleId)
        .then(role=>{
            if(role){
                return role.setResources(resources);
            }else{
                return Promise.reject(`role with id ${roleId} not found`);
            }
        });
}


/**
 * 判断一些资源是否已经授权给角色
 */
resourceService.whetherResourcesAssociatedWithRole=function(roleId,resourceIds){
    return roleService.findById(roleId)
        .then(role=>{
            if(!role){
                return [];
            }else{
                return role.getResources().then(resources=>{
                    return resourceIds.map(id=>{ 
                        const flag= resources.some(r=>r.id==id); 
                        return {id,flag}; 
                    });
                });
            }
        });
};


/**
 * 资源授权
 */
resourceService.grantResourceToRole=function(roleId,resourceId){
    return Promise.all([
        roleService.findById(roleId),
        resourceService.findById(resourceId),
    ])
        .then(result=>{
            const role=result[0];
            const resource=result[1];
            if(!role){
                return message.fail(`cannot find role with id: ${roleId}`);
            }
            if(!resource){
                return message.fail(`cannot find resource with id: ${resourceId}`);
            }
            else{
                return role.addResource(resource,{through:{  }})
                    .then(_=>{ return message.success(); });
            }
        });
};


/**
 * 资源授权取消
 */
resourceService.grantResourceToRoleCancel=function(roleId,resourceId){
    return Promise.all([
        roleService.findById(roleId),
        resourceService.findById(resourceId),
    ])
        .then(result=>{
            const role=result[0];
            const resource=result[1];
            if(!role){
                return message.fail(`cannot find role with id: ${roleId}`);
            }
            if(!resource){
                return message.fail(`cannot find resource with id: ${resourceId}`);
            }
            else{
                return role.removeResource(resource)
                    .then(_=>{ return message.success(); });
            }
        });
};



module.exports=resourceService;