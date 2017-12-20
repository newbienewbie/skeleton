const express=require('express');
const {categoryService}=require('../../service');


const router=express.Router();

function listOfScope(req,res,next){
    const scope=req.params.scope?req.params.scope:"post";
    categoryService.listAll({
        'scope':scope
    }).then(list=>{
        res.end(JSON.stringify(list));
    });
}

function treeOfScope(req,res,next){
    const scope=req.params.scope?req.params.scope:"post";
    categoryService.tree({
        'scope':scope
    }).then(list=>{
        res.end(JSON.stringify(list));
    });
}

const routes={
    'list-of-scope':{
        method:'use',
        path:'/list/:scope',
        middlewares:[ listOfScope ],
        allowRoles:['ROLE_ANONYMOUS','ROLE_USER'],
    },
    'tree-of-scope':{
        method:'use',
        path:'/tree/:scope',
        middlewares:[ treeOfScope ],
        allowRoles:['ROLE_ANONYMOUS','ROLE_USER'],
    },
};


module.exports={
    mount:'/category',
    routes,
};