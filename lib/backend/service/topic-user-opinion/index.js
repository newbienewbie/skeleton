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


function dislike(scope,topicId,userId){
    return create(scope,topicId,userId,"dislike");
}

function cancelDislike(scope,topicId,userId){
    return cancel(scope,topicId,userId,"dislike");
}


module.exports={
    like,cancelLike,
    dislike,cancelDislike,
};