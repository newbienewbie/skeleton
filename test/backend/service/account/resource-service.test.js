require('../../../init-test-config.js');
const domain=require('../../../../backend/domain');
const roleService=require('../../../../backend/service/account/role-service');
const resourceService=require('../../../../backend/service/account/resource-service');
const assert=require('assert');

describe('test resource service',function(){

    it("#addRosourceOfRole() #removeResourceOfRole #remove",function(){
        const _role={name:'x8',description:'x8'};
        const _resource={name:'shit',categoryId:1,method:'post',path:'/test',description:'',status:'test'};
        // 创建角色
        return roleService.create(_role)
            .then(role=>{
                // 创建 资源 及 角色-资源关联关系
                return resourceService.addResourceOfRole(role.id,_resource)
                    .then(roleResources=>{
                        const x=JSON.parse(JSON.stringify(roleResources[0][0]));
                        // 检查角色-资源的关联关系
                        return role.getResources()
                            .then(resources=>{
                                assert.ok(resources.some(r=> r.name=_resource.name));
                            })
                            // 移除角色-资源的关联关系
                            .then(_=>{
                                return resourceService.removeResourceOfRole(role.id,{id:x.resourceId} )
                                    .then(_=>role.getResources())
                                    .then(resources=>{
                                        assert.equal(resources.length,0,"移除之后，授权的资源数量应该为0");
                                    })
                                    // 确保只是 角色-资源的关联关系被删除了，但是 角色 未被删除
                                    .then(_=>{
                                        return roleService.findById(role.id)
                                            .then(__role=>{
                                                assert.equal(__role.name,role.name);
                                                assert.equal(__role.description,role.description);
                                            });
                                    })
                            })
                            // 删除资源
                            .then(_=>{
                                return resourceService.remove(x.resourceId)
                            });
                    })
                    // 删除角色
                    .then(_=>roleService.remove(role.id));
            })
    })
});