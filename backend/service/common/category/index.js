const domain=require('../../../domain');
const {listToTree,subnodeIdList} =require('./tree');

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


/**
 * 根据condition晒出一批category，然后从中选出以pid为祖先的节点，然后返回这些节点的id列表
 * condition可以用来指定scope等条件
 */
function getCategorySubnodeIdList(pid,condition={}){
    return domain.category.findAll({where:condition})
        .then(list=>{
            if(list){
                return subnodeIdList(list,pid);
            }else{
                return [];
            }
        });
}


function tree(condition={}){
    return domain.category.findAll({where:condition})
        .then(list=>listToTree(list));
}


module.exports={
    list,listAll,getCategorySubnodeIdList,tree,
};