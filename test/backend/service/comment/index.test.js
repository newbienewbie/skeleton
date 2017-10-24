require('../../../init-test-config.js');
const commentService=require('../../../../backend/service/comment');
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

    it('测试#createCommentOrReply()、#findById()和#remove()',function(){
        const info={
            id:null,
            content:'测试',
            authorId:1,
            topicId:1,
            scope:'post',
            replyTo:null,
        };
        // 创建，删除，再查找之
        return commentService.createCommentOrReply(info)
            .then(c=>{
                info.id=c.id; //保存id
                assert.equal(c.content,info.content);
                assert.equal(c.authorId,info.authorId);
                assert.equal(c.topicId,info.topicId);
                assert.equal(c.replyTo,info.replyTo);
            }).then(_=>{
                return commentService.remove(info.id)
            }).then(_=>{
                return commentService.findById(info.id)
            })
            .then(c=>{
                return assert.equal(c,null);
            });
    });

    it('测试#listAllReplies()',function(){
        const scope="ebook";
        const topicId=257;
        const page=1;
        const size=10;
        const replySize=5;
        return commentService.listAllReplies(scope,topicId,page,size,replySize)
            .then(results=>{
                Object.keys(results).forEach(k=>{
                    const e=results[k];
                    assert.ok(e.hasOwnProperty("rows"),"必定拥有rows属性");
                    assert.ok(e.hasOwnProperty("count"),"必定拥有count属性");
                    assert.ok(Array.isArray(e.rows),"e.rows必定是个数组");
                    e.rows.forEach(i=>{
                        assert.ok(i.hasOwnProperty("id"),'必定拥有id属性');
                        assert.ok(i.hasOwnProperty("content"),'必定拥有content属性');
                        assert.ok(i.hasOwnProperty("scope"),'必定拥有scope属性');
                        assert.ok(i.hasOwnProperty("upvotes"),'必定拥有upvotes属性');
                        assert.ok(i.hasOwnProperty("downvotes"),'必定拥有downvotes属性');
                        //assert.ok(i.hasOwnProperty("authorId"),'必定拥有authorId属性');
                        assert.ok(i.hasOwnProperty("topicId"),'必定拥有topicId属性');
                        assert.ok(i.hasOwnProperty("replyTo"),'必定拥有replyTo属性');
                        assert.ok(i.hasOwnProperty("replyUnder"),'必定拥有replyUnder属性');
                        assert.ok(i.hasOwnProperty("createdAt"),'必定拥有createdAt属性');
                        assert.ok(i.hasOwnProperty("updatedAt"),'必定拥有updatedAt属性');
                    });
                });
            })
    });

});