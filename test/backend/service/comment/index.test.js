const commentService=require('../../../../lib/backend/service/comment');
const assert=require('assert');


describe('测试commentService',function(){

    it('测试#create()、#findById()和#remove()',function(){
        comment={
            id:null,
            content:'测试',
            authorId:1,
            topicId:1,
        };
        // 创建，删除，再查找之
        return commentService.create(comment)
            .then(c=>{
                comment.id=c.id; //保存id到原comment对象
                assert.equal(c.content,comment.content);
                assert.equal(c.authorId,comment.authorId);
                assert.equal(c.topicId,comment.topicId);
            }).then(_=>{
                return commentService.remove(comment.id)
            }).then(_=>{
                return commentService.findById(comment.id)
            })
            .then(c=>{
                return assert.equal(c,null);
            });
    });

});