const domain=require('../../domain/domain');


function create(comment){
    return domain.comment.create(comment)
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

function listByTopicId(topicId,page=1,size=10){
    return domain.comment.findAndCount({
        where:{topicId:topicId,},
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