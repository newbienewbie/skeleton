/**
 * OpenShift需要的指示健康与否的文件
 */
const express=require('express');



function health(req,res) {
    res.writeHead(200);
    res.end("1");
}

const routes={
    'index':{
        method:'get',
        path:'/',
        middlewares:[health],
        allowRoles:['ROLE_ANONYMOUS','ROLE_USER'],
    }
};


module.exports={
    mount:'/health',
    routes,
};
