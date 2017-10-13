const {Service}=require('tiny-service');
const domain=require('../../domain');


const resourceService=Service(domain.resource);

/**
 * 获取某个角色获得授权的资源列表
 * @param {Number} roleId 
 * @param {Number} page 
 * @param {Number} size 
 * @param {Object} condition 
 */
resourceService.listResourcesOfRole= function listResourcesOfRole(roleId,page=1,size=8,condition={}){

    return domain.resource.findAll({
        where:condition,
        offset:(page-1)*size,
        limit:size,
        include:[
            {
                model:domain.role,
                through:{
                    where:{ 
                        userId:roleId, 
                    }
                },
            }
        ],
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



module.exports=resourceService;