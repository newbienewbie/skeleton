const express=require('express');
const path=require('path');



function index(req,res) {
    let session=req.session;
    res.render("index.njk", {
        greetings:session.username
    });
}

const routes={
    'index':{
        method:'get',
        path:'/',
        middlewares:[ index],
        allowRoles:['ROLE_ANONYMOUS','ROLE_USER'],
    },
};

module.exports={
    mount:'/',
    routes,
};