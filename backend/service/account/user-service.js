const domain=require('../../domain');


function findById(userId){
    return domain.user.findById(userId);
}

function getRoles(userId,roles){
    return domain.user.findById(userId)
        .then(user=>{
            if(!user){throw new Error(`user not found :${userId}`)}
            return user.getRoles();
        });
}


module.exports={
    findById,
};