const domain=require('../../domain/domain');


function findById(id=1){
    return domain.post.findById(id);
}

function create(post){
    return domain.post.create(post);
}

function remove(id){
    return domain.post.findById(id)
        .then((post)=>{
            return post.destory();
        });
}

function edit(post){
}


module.exports={
    findById,
    create,
    remove,
    edit
};
