const assert=require('assert');
const {like,dislike,cancelLike,cancelDislike}=require('../../../../lib/backend/service/topic-user-opinion');


describe('测试 topicUserOpinionService',function(){

    describe('测试 #like()及#cancelLike()',function(){
        
        const scope="test";
        const topicId=1;
        const userId=1;

        it('测试 like后再取消',function(){
            return like(scope,topicId,userId)
                .then(s=>{
                    assert.ok(s.id>1,`id必定大于1：${s.id}`);
                    assert.equal(s.topicId,topicId);
                    assert.equal(s.userId,userId);
                })
                .then(_=>{
                    return cancelLike(scope,topicId,userId);
                });
        });

    });

    describe('测试 #dislike()及 #cancelDislike()',function(){
        
        const scope="test";
        const topicId=1;
        const userId=1;

        it('测试 dislike后再取消',function(){
            return dislike(scope,topicId,userId)
                .then(s=>{
                    assert.ok(s.id>1,`id必定大于1：${s.id}`);
                    assert.equal(s.topicId,topicId);
                    assert.equal(s.userId,userId);
                })
                .then(_=>{
                    return cancelDislike(scope,topicId,userId);
                });
        });

    });

});