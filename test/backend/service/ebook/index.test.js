require('../../../init-test-config.js');
const assert=require('assert');
const ebookService=require('../../../../backend/service/cms/ebook');


describe("测试 ebook-service",function(){
    it('测试',function(){
        const ebook={
            title:'title', author:'author', isbn:'isbn', categoryId:1,
            keywords:[ 
                {tag:'测试1'},
                {tag:'测试2'},
            ],
            posterUrl:'#', url:'#',
            description:'#',
            uploaderId:1,
        };
        return ebookService.create(ebook)
            .then(eb=>{
                assert.equal(eb.title,ebook.title,"创建的和原始的必须相同");
                assert.equal(eb.author,ebook.author,"创建的和原始的必须相同");
                assert.equal(eb.isbn,ebook.isbn,"创建的和原始的必须相同");
                assert.equal(eb.categoryId,ebook.categoryId,"创建的和原始的必须相同");
                assert.equal(eb.posterUrl,ebook.posterUrl,"创建的和原始的必须相同");
                assert.equal(eb.url,ebook.url,"创建的和原始的必须相同");
                assert.equal(eb.description,ebook.description,"创建的和原始的必须相同");
                assert.equal(eb.uploaderId,ebook.uploaderId,"创建的和原始的必须相同");
                assert.equal(eb.keywords.length,ebook.keywords.length,"关键词数量相同");
                return eb;
            })
            .then(eb=>{
                // 删除
                return ebookService.remove(eb.id)
                    // 重新寻找
                    .then(_=> ebookService.findById(eb.id))
                    .then(eb=>{
                        assert.ok(!eb,"理应不再存在");
                    });
            });
    });
});
