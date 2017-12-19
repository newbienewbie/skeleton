/**
 * 用于配置UEditor的服务端
 */
const express=require('express');
const UEditor=require('express-ueditor');



const ueditor=new UEditor();

const routes={
    'controller':{
        method:'use',
        path:'/controller',
        middlewares:[ ueditor.config() ,  ueditor.upload('uploadimage'), ueditor.upload('uploadfile') ]
    },
};


module.exports={
    mount:'/ueditor',
    routes,
};