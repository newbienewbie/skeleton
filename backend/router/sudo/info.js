const sysInfo=require('../../utils/sys-info');
const express=require('express');



function gen(req,res){
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'no-cache, no-store');
    res.end(JSON.stringify(sysInfo.gen()));
}

function poll(req,res){
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'no-cache, no-store');
    res.end(JSON.stringify(sysInfo.poll()));
}

const routes={
    'gen':{
        method:'get',
        path:'/gen',
        middlewares:[ gen ],
    },
    'poll':{
        method:'get',
        path:'/poll',
        middlewares:[ poll ],
    },
};



module.exports={
    mount:'/info',
    routes,
};