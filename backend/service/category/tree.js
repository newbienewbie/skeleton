

class TreeNode{

    constructor(value){
        this.value=value;
        this.children=[];
    }
}



function _listToTree(list,pid=null){
    const tree=list.filter(i=>i.pid==pid)
        .map(i=>new TreeNode(i))
    tree.forEach(node=>{
        const id=node.value.id;
        node.children=_listToTree(list,id);
    });
    return tree;
}

function listToTree(list){
    return _listToTree(list,null);
}

/**
 * 获取分类列表某节点的所有子节点列表
 * 注意，返回节点列表不包含参数id(父节点)
 * @return {Array}
 */
function subnodeIdList(list,id){
    const sublist=list.filter(e=>e.pid==id);
    let ids=sublist.map(i=>i.id);
    sublist.forEach(e=>{
        const subids=subnodeIdList(list,e.id)
        ids=ids.concat(subids);
    })
    return ids;
}


module.exports={
    listToTree,
    subnodeIdList
};