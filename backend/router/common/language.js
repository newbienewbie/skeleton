const domain=require('../../domain');
const express=require('express');
const bodyParser=require('body-parser');



function list(req,res){
    domain.language.findAll()
        .then(lanList=>{
            res.end(JSON.stringify(lanList));
        }).catch(e=>{
            res.end(JSON.stringify({
                msg:'读取language错误',
            }));
        });
}

const routes={
    'list':{
        method:'get',
        path:'/list',
        middlewares:[ list ],
        allowRoles:['ROLE_ANONYMOUS','ROLE_USER'],
    },
};

module.exports={
    mount:'/language',
    routes,
};