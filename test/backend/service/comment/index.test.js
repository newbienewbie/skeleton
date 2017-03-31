const commentService=require('../../../../lib/backend/service/comment');
const assert=require('assert');


describe('测试commentService',function(){

    it('测试#create()、#findById()和#remove()',function(){
        const comment={
            id:null,
            content:'测试',
            authorId:1,
            topicId:1,
            scope:'post',
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

    it("测试#listByTopicId",function(){
        const scope="post";
        const topicId=1;
        const replyTo=null;
        return commentService.listByTopicId(scope,topicId,replyTo,1,10)
            .then(result=>{
                assert.ok(result.hasOwnProperty("count"));
                assert.ok(result.hasOwnProperty("rows"));
                assert.ok(Array.isArray(result.rows));
            });
    });

    it('测试#create()、#like、#cancelLike和#remove()',function(){
        const comment={
            id:null,
            content:'测试',
            authorId:1,
            topicId:1,
            scope:'post',
        };
        // 创建，删除
        return commentService.create(comment)
            .then(c=>{
                comment.id=c.id; //保存id到原comment对象
                assert.equal(c.content,comment.content);
                assert.equal(c.authorId,comment.authorId);
                assert.equal(c.topicId,comment.topicId);
                return c;
            })
            .then(c=>{
                return commentService.like(comment.authorId,comment.id)
            })
            .then(_=>{
                assert.ok(_,"必定不是false");
                assert.ok(Array.isArray(_),"必定是Array");
                assert.equal(_.length,2,"数组长度必定是2");
                return commentService.findById(comment.id)
                    .then(c=>{
                        assert.ok(c.upvotes>0);
                    });
            })
            .then(c=>{
                return commentService.cancelLike(comment.authorId,comment.id);
            })
            .then(_=>{
                console.log("******************",_);
                assert.ok(_,"必定不是false");
                assert.ok(Array.isArray(_),"必定是Array");
                assert.equal(_.length,2,"数组长度必定是2");
            })
            .then(_=>{
                return commentService.remove(comment.id)
            })
            .then(c=>{
                return commentService.findById(comment.id)
                    .then(c=>{
                        assert.equal(c,null);
                    });
            });
    });

});