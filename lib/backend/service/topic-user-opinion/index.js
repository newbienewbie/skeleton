const domain=require('../../domain/domain');


function create(scope,topicId,userId,opinion){
    return domain.topicUserOpinion.create({
        scope,topicId,userId, opinion
    });
}


function cancel(scope,topicId,userId,opinion){
    return domain.topicUserOpinion.destroy(
        {
            where:{
                scope,topicId,userId,opinion
            }
        }
    );
}


function like(scope,topicId,userId){
    return create(scope,topicId,userId,"like");
}


function cancelLike(scope,topicId,userId){
    return cancel(scope,topicId,userId,"like");
}


function hate(scope,topicId,userId){
    return create(scope,topicId,userId,"hate");
}

function cancelHate(scope,topicId,userId){
    return cancel(scope,topicId,userId,"hate");
}


module.exports={
    like,cancelLike,
    hate,cancelHate,
};