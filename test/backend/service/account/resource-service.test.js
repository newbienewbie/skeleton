require('../../../init-test-config.js');
const domain=require('../../../../backend/domain');
const roleService=require('../../../../backend/service/account/role-service');
const resourceService=require('../../../../backend/service/account/resource-service');
const assert=require('assert');

describe('test resource service',function(){

    it("#addRosourceOfRole() #removeRole",function(){
        const _role={name:'x8',description:'x8'};
        const _resource={name:'shit',categoryId:1,method:'post',path:'/test',description:'',status:'test'};
        return roleService.create(_role)
            .then(role=>{
                return resourceService.addResourceOfRole(role.id,_resource)
                    .then(roleResources=>{
                        return role.getResources().then(resources=>{
                            assert.ok(resources.some(r=> r.name=_resource.name));
                        })
                        .then(_=>resourceService.updateResourcesOfRole(role.id,[]))
                        .then(_=>{
                            const x=JSON.parse(JSON.stringify(roleResources[0][0]));
                            resourceService.remove(x.resourceId)
                        });
                    })
                    .then(_=>roleService.remove(role.id));
            })
    })
});