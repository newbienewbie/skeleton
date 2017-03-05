const domain=require('../../domain/domain');


function list(page=1,size=100,condition={}){
    return domain.category.findAndCount({
        offset:(page-1)*size,
        limit:size,
        where:condition,
    });
}

function listAll(condition={}){
    return domain.category.findAndCount({where:condition});
}




module.exports={
    list,listAll,
};