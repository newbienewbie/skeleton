const domain=require('../../domain/domain');


function create(comment){
    return domain.comment.create(comment);
}



function remove(id){
    return domain.comment.findById(id).then(c=>{
        return c.destroy();
    });
}

function update(comment){

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

module.exports={
    create,remove,update,findById,listByTopicId
};