const express=require('express');
const {categoryService}=require('../../service');


const router=express.Router();

const routes={
    'list-of-scope':{
        method:'use',
        path:'/list/:scope',
        middlewares:[ listOfScope ],
    },
    'tree-of-scope':{
        method:'use',
        path:'/tree/:scope',
        middlewares:[ treeOfScope ],
    },
};

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

Object.keys(routes).forEach(k=>{
    const {method,path,middlewares}=routes[k];
    middlewares.forEach(mw=>{
        router[method](path,mw);
    });
});


module.exports=router;