const domain=require('../../domain/domain');
const {listToTree} =require('./tree');

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




function tree(condition={}){
    return domain.category.findAll({where:condition})
        .then(list=>listToTree(list));
}


module.exports={
    list,listAll, tree
};