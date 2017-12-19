/**
 * 后台管理路由器
 */
const express=require('express');



function index(req,res){
    res.render('dashboard.html');
}

const routes={
    'index':{
        method:'get',
        path:'/',
        middlewares:[ index],
    },
};

module.exports={
    mount:'/dashboard',
    routes,
};