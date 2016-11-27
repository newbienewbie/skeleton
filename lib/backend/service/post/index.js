const domain=require('../../domain/domain');


function findById(id=1){
    return domain.post.findById(id);
}

/**
 * todo:把condition转化为where
 */
function list(page=1,size=10,condition={}){
    return domain.post.findAndCount({
        offset:(page-1)*size,
        limit:size,
    });
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
    list,
    create,
    remove,
    edit
};
