const express=require('express');



function index(req,res){
    res.render('404.html');
}

const routes={
    'index':{
        method:'get',
        path:'/',
        middlewares:[ index],
    },
};

module.exports={
    mount:'/404',
    routes,
};