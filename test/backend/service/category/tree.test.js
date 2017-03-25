const assert=require('assert');
const {listToTree}=require('../../../../lib/backend/service/category/tree');


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
});