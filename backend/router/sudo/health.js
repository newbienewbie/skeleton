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
    }
};


module.exports={
    mount:'/health',
    routes,
};
