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

module.exports={
    create,remove,update,findById,
};