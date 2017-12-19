const express=require('express');
const bodyParser=require('body-parser');
const util=require('util');

const domain=require('../../domain');


const _result={
    result:'SUCCESS',
    msg:'',
};

const jsonMiddleware=bodyParser.json();
function add(req,res){
    const director=req.body;
    domain.director
        .create(Object.assign({},director,{
            countryId:director.country
        }))
        .then(director=>{
            res.end(JSON.stringify(_result));
        })
        .catch(e=>{
            _result.result="FAIL";
            _result.msg="请求错误";
            res.end(JSON.stringify(_result));
        });
}


const routes={
    'add':{
        method:'post',
        path:'/add',
        middlewares:[jsonMiddleware,add],
    },
};

module.exports={
    mount:'/director',
    routes,
};