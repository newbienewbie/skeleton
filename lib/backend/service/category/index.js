const domain=require('../../domain/domain');


function list(page=1,size=10,condition={}){
    return domain.category.findAndCount({
        offset:(page-1)*size,
        limit:size,
    });
}

function listAll(){
    return domain.category.findAndCount();
}




module.exports={
    list,listAll,
};