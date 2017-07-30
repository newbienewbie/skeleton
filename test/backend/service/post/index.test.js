require('../../../init-test-config.js');
const assert=require('assert');
const postService=require('../../../../backend/service/post');
const keywordService=require('../../../../backend/service/keyword')("post");

describe('测试post服务',function(){
    it('测试create()',function(){
        return postService.create({
            title:'标题',
            categoryId:1,
            authorId:1,
            content:'测试',
            excerpt:'摘要',
            keywords:[
                {tag:'标签5'},
                {tag:'标签6'},
            ]
        })
        // 断言检查
        .then(p=>{
            assert.equal(p.title,"标题");
            assert.equal(p.content,"测试");
            assert.equal(p.excerpt,"摘要");
            assert.equal(p.categoryId,1);
            assert.equal(p.authorId,1);
            return keywordService.findAllByTopicId(p.id).then(keywords=>{
                keywords.forEach(k=>{
                    assert.equal(k.topicId,p.id,`关键词的postId和文章的id必须相等：${k.topicId}-${p.id}`)
                });
            })
            // 返回以留待删除
            .then(_=>{
                return p;
            });
        })
        // 删除
        .then(p=>{
            return keywordService.findAllByTopicId(p.id)
                .then(keywords=>keywords.map(k=>{
                    return k.destroy();
                }))
                .then(_=>{
                    return p.destroy();
                });
        });
    });
});