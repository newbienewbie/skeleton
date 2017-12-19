const express=require('express');



function index(req,res){
    res.render('contact/index.njk',{});
}

const routes={
    'index':{
        method:'get',
        path:'/',
        middlewares:[ index ],
    },
};


module.exports={
    mount:'/contact',
    routes,
};