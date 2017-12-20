const express=require('express');



function index(req,res){
    res.render('contact/index.njk',{});
}

const routes={
    'index':{
        method:'get',
        path:'/',
        middlewares:[ index ],
        allowRoles:['ROLE_ANONYMOUS','ROLE_USER'],
    },
};


module.exports={
    mount:'/contact',
    routes,
};