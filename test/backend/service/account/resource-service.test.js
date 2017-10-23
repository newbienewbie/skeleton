require('../../../init-test-config.js');
const domain=require('../../../../backend/domain');
const roleService=require('../../../../backend/service/account/role-service');
const resourceService=require('../../../../backend/service/account/resource-service');
const assert=require('assert');

describe('test resource service',function(){

    it("#createRosourceOfRole() #removeResourceOfRole #remove",function(){
        const _role={name:'x8',description:'x8'};
        const _resource={name:'shit',categoryId:1,method:'post',path:'/test',description:'',status:'test'};
        // 创建角色
        return roleService.create(_role)
            .then(role=>{
                // 创建 资源 及 角色-资源关联关系
                return resourceService.createResourceOfRole(role.id,_resource)
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


    describe('测试resource服务',function(){
        it('测试#create() #edit() #list() #findById() #remove()',function(){
            function testEqual(r1,r2){
                assert.equal(r1.name,r2.name,'name 不一致');
                assert.equal(r1.categoryId,r2.categoryId,'categoryId 不一致');
                assert.equal(r1.method,r2.method,'method 不一致');
                assert.equal(r1.path,r2.path,'path 不一致');
                assert.equal(r1.status,r2.status,'status 不一致');
                assert.equal(r1.description,r2.description,'description 不一致');
            }
    
            const resource={
                name:'资源名',
                categoryId:1,
                method:'GET',
                path:'/module/submodule/:param',
                status:'test',
                description:'',
            }
            return resourceService.create(resource)
                .then(r=>{
                    // 断言检查
                    testEqual(r,resource);
                    return r;
                })
                .then(r=>{
                    // 编辑
                    resource.id=r.id;
                    resource.name='巴拉巴拉';
                    resource.categoryId=2;
                    resource.method="POST";
                    return resourceService.update(r.id,resource);
                })
                .then(_=>{
                    // 列举
                    return resourceService.list(resource.categoryId,1,8)
                        .then(list=>{
                            assert.ok(list.hasOwnProperty('rows'));
                            assert.ok(list.hasOwnProperty('count'));
                            assert.ok(Array.isArray(list.rows));
                        });
                })
                .then(_=>{
                    // 查找
                    return resourceService.findById(resource.id);
                })
                .then(r=>{
                    testEqual(r,resource);
                    return r;
                })
                .then(r=>{
                    // 删除
                    return resourceService.remove(r.id);
                });
        });
        
        it("测试#list()",function(){
    
        });
    });
});