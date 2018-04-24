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
        allowRoles:['ROLE_CMS_AUTHOR','ROLE_CMS_EDITOR','ROLE_CMS_ADMIN','ROLE_SYS_ADMIN'],
    },
};

module.exports={
    mount:'/dashboard',
    routes,
};