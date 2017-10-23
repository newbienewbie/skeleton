require('../../../init-test-config.js');
const assert=require('assert');
const {listToTree,subnodeIdList}=require('../../../../backend/service/common/category/tree');


describe("测试 tree.js",function () {
    
    it("测试 #listToTree()", function(){
        const list= [
            {"id":1,"name":"通知公告","scope":"post","pid":null,"note":null,"createdAt":"2017-03-18 10:18:02","updatedAt":"2017-03-18 10:18:02"},
            {"id":2,"name":"新闻动态","scope":"post","pid":null,"note":null,"createdAt":"2017-03-18 10:18:02","updatedAt":"2017-03-18 10:18:02"},
            {"id":3,"name":"会议纪要","scope":"post","pid":null,"note":null,"createdAt":"2017-03-18 10:18:02","updatedAt":"2017-03-18 10:18:02"},
            {"id":4,"name":"学习交流","scope":"post","pid":null,"note":null,"createdAt":"2017-03-18 10:18:02","updatedAt":"2017-03-18 10:18:02"},
            {"id":5,"name":"视读空间","scope":"post","pid":null,"note":null,"createdAt":"2017-03-18 10:18:02","updatedAt":"2017-03-18 10:18:02"},
            {"id":6,"name":"曝光专栏","scope":"post","pid":null,"note":null,"createdAt":"2017-03-18 10:18:02","updatedAt":"2017-03-18 10:18:02"},
            {"id":7,"name":"Program","scope":"ebook","pid":null,"note":null,"createdAt":"2017-03-18 10:18:02","updatedAt":"2017-03-18 10:18:02"},
            {"id":8,"name":"Java","scope":"ebook","pid":7,"note":null,"createdAt":"2017-03-18 10:18:02","updatedAt":"2017-03-18 10:18:02"},
            {"id":9,"name":"Java IO","scope":"ebook","pid":8,"note":null,"createdAt":"2017-03-18 10:18:02","updatedAt":"2017-03-18 10:18:02"},
        ];
        const tree=listToTree(list);

        const program=tree[6];
        assert.equal(program.value.name, list[6].name);

        const java=program.children[0];
        assert.equal(java.value.name, list[7].name);

        const javaio=java.children[0];
        assert.equal(javaio.value.name,list[8].name);
    } );

    describe("测试 #subnodeIdList()",function(){
        const list=[
            {"id":1,"name":"通知公告","scope":"post","note":null,"pid":null},
            {"id":2,"name":"新闻动态","scope":"post","note":null,"pid":null},
            {"id":3,"name":"会议纪要","scope":"post","note":null,"pid":null},
            {"id":4,"name":"学习交流","scope":"post","note":null,"pid":null},
            {"id":5,"name":"视读空间","scope":"post","note":null,"pid":null},
            {"id":6,"name":"曝光专栏","scope":"post","note":null,"pid":null},
            {"id":7,"name":"信息技术","scope":"ebook","note":null,"pid":null},
            {"id":8,"name":"信息安全","scope":"ebook","note":null,"pid":7},
            {"id":9,"name":"数据库","scope":"ebook","note":null,"pid":7},
            {"id":10,"name":"编程语言","scope":"ebook","note":null,"pid":7},
            {"id":11,"name":"编译原理","scope":"ebook","note":null,"pid":7},
            {"id":12,"name":"设计模式","scope":"ebook","note":null,"pid":7},
            {"id":13,"name":"Java","scope":"ebook","note":null,"pid":10},
            {"id":14,"name":"JavaScript","scope":"ebook","note":null,"pid":10},
            {"id":15,"name":"Python","scope":"ebook","note":null,"pid":10},
            {"id":16,"name":"PHP","scope":"ebook","note":null,"pid":10},
            {"id":17,"name":"C#","scope":"ebook","note":null,"pid":10},
            {"id":18,"name":"C/C++","scope":"ebook","note":null,"pid":10},
            {"id":19,"name":"Rust","scope":"ebook","note":null,"pid":10},
            {"id":20,"name":"MatLab","scope":"ebook","note":null,"pid":10},
            {"id":21,"name":"HTML/CSS","scope":"ebook","note":null,"pid":10},
            {"id":22,"name":"通用","scope":"ebook","note":null,"pid":9},
            {"id":23,"name":"MySQL","scope":"ebook","note":null,"pid":9},
            {"id":24,"name":"Oracle","scope":"ebook","note":null,"pid":9},
            {"id":25,"name":"SQL Server","scope":"ebook","note":null,"pid":9}
        ];
        it("测试 #subnodeIdList() - 检索中间某个节点的子节点",function(){
            const sub=subnodeIdList(list,7);
            assert.ok(Array.isArray(sub));
            const targets=[ 8, 9, 10, 11, 12, 22, 23, 24, 25, 13, 14, 15, 16, 17, 18, 19, 20, 21 ]
            targets.forEach(e=>{
                assert.ok(sub.includes(e),`8~25均必须是子节点:${e}未找到`);
            });
        });
        it("测试 #subnodeIdList() - 检索顶级null节点的子节点",function(){
            const sub=subnodeIdList(list,null);
            assert.ok(Array.isArray(sub));
            assert.equal(sub.length,25);
            const targets=[ 1,2,3,4,5,6,7,8,9,10,11,12,22,23,24,25,13,14,15,16,17,18,19,20,21];
            targets.forEach(e=>{
                assert.ok(sub.includes(e),`1~25均必须是子节点:${e}未找到`);
            });
        });    
        it("测试 #subnodeIdList() - 检索不存在的节点",function(){
            const sub=subnodeIdList(list,77);
            assert.ok(Array.isArray(sub));
            assert.equal(sub.length,0);
        });    
        it("测试 #subnodeIdList() - 检索叶子节点",function(){
            const sub=subnodeIdList(list,16);
            assert.ok(Array.isArray(sub));
            assert.equal(sub.length,0);
        });    
    });



});