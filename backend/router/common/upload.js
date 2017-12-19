const UEditor=require('express-ueditor');
const express=require('express');

const ueditor=new UEditor({
    videoMaxSize:5*1014*1024*1024,
});


const routes={
    'image':{
        method:'post',
        path:'/image',
        middlewares:[ ueditor.upload("uploadimage") ],
    },
    'video':{
        method:'post',
        path:'/video',
        middlewares:[ ueditor.upload("uploadvideo") ],
    },
};


module.exports={
    mount:'/upload/meiying',
    routes,
};


