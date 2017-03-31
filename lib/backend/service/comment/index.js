const domain=require('../../domain/domain');
const userOpinion=require('../topic-user-opinion');

function create(comment){
    return domain.comment.create(comment);
}



function remove(id){
    return domain.comment.findById(id).then(c=>{
        return c.destroy();
    });
}


/**
 * 更新
 * @param {*} comment 
 */
function update(comment){
    const _comment=JSON.parse(JSON.stringify(comment));
    const id=_comment.id;
    delete _comment.id;
    
    return domain.comment.update(
        _comment,
        {where:{ id:_comment.id, }}
    );
}


function findById(id){
    return domain.comment.findById(id);
}


/**
 * 根据主题列举出评论
 * @param {String} scope 
 * @param {Number} topicId 
 * @param {Number} replyTo 
 * @param {Number} page 
 * @param {Number} size 
 * @return {Object} {rows:[],count:null}
 */
function listByTopicId(scope,topicId,replyTo=null,page=1,size=10){
    return domain.comment.findAndCount({
        where:{scope:scope,topicId:topicId,replyTo:replyTo},
        limit:size,
        offset:(page-1)*size,
        order:[
            ['createdAt','desc'],
        ],
        include:[
            {model:domain.user,as:'author'}
        ],
    });
}


/**
 * 在表达意见之前的基本检查，返回Promise<false>则表示可以不表达意见;
 * 否则，返回Promise<Comment>， comment 是commentId对应的对象
 * @param {Number} userId 
 * @param {Number} commentId 
 * @return {Promise<Boolean>}
 */
function preOpinion(userId,commentId,opinions=["like","hate"]){
    return domain.comment.findById(commentId)
        .then(comment=>{
            if(!comment){
                return false;
            }else{
                return userOpinion.hasAnyOpinionOf("comment",commentId,userId,opinions)
                    .then(has=>{
                        if(has){
                            return false;
                        }else{
                            return comment;
                        }
                    });
            }
        });
}

/**
 * 取消意见之前的必要检查，返回Promise<false>则表示不可取消，否则返回Promise<comment>
 * @param {Number} userId 
 * @param {Number} commentId 
 * @param {String} opinion 
 */
function preCancelOpinion(userId,commentId,opinion="like"){
    return domain.comment.findById(commentId)
        .then(comment=>{
            if(!comment){
                return false;
            }else{
                return userOpinion.hasAnyOpinionOf("comment",commentId,userId,["like"])
                    .then(has=>{
                        if(has){
                            return comment;
                        }else{
                            return false;
                        }
                    });
            }
        });
}

/**
 * 用户喜欢
 * @param {Number} userId 
 * @param {Number} commentId 
 * @return {Promise}
 */
function like(userId,commentId){
    return preOpinion(userId,commentId)
        .then(comment=>{
            if(!!comment){
                return Promise.all([
                    comment.increment('upvotes'),
                    userOpinion.like("comment",commentId,userId)
                ]);
            }else{
                return false;
            }
        });
}


/**
 * 用户取消喜欢
 * @param {Number} userId 
 * @param {Number} commentId 
 * @return {Promise}
 */
function cancelLike(userId,commentId){
    return preCancelOpinion(userId,commentId,"like")
        .then(comment=>{
            if(!!comment){
                return Promise.all([
                    comment.decrement('upvotes'),
                    userOpinion.cancelLike("comment",commentId,userId)
                ]);
            }else{
                return false;
            }
        });
}


/**
 * 用户讨厌
 * @param {Number} userId 
 * @param {Number} commentId 
 * @return {Promise}
 */
function hate(userId,commentId){
    return preOpinion(userId,commentId)
        .then(comment=>{
            if(!!comment){
                return Promise.all([
                    comment.increment('downvotes'),
                    userOpinion.hate("comment",commentId,userId),
                ]);
            }else{
                return false;
            }
        });
}


/**
 * 用户取消讨厌
 * @param {Number} userId 
 * @param {Number} commentId 
 * @return {Promise}
 */
function cancelHate(userId,commentId){
    
    return preCancelOpinion(userId,commentId,"hate")
        .then(comment=>{
            if(!!comment){
                return Promise.all([
                    comment.decrement('downvotes'),
                    userOpinion.cancelHate("comment",commentId,userId)
                ]);
            }else{
                return false;
            }
        });
}

module.exports={
    create,remove,update,findById,listByTopicId,
    like,cancelLike,hate,cancelHate,
};