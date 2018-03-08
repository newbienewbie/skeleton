const express=require('express');
const {categoryService}=require('../../service');
const {CategoryMiddleware}=require("tiny-service");

const middleware=CategoryMiddleware(categoryService);


const routes={
    'list-of-scope':{
        method:'use',
        path:'/list/:scope',
        middlewares:[ middleware.listOfScope ],
    },
    'tree-of-scope':{
        method:'use',
        path:'/tree/:scope',
        middlewares:[ middleware.treeOfScope ],
    },
};


module.exports={
    mount:'/category',
    routes,
};