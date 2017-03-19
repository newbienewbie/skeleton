

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


module.exports={
    listToTree,
};