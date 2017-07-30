require('../../../init-test-config.js');
const assert=require('assert');
const resourceService=require('../../../../backend/service/account/resource-service');

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
                return resourceService.edit(resource);
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