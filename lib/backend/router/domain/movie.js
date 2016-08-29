const domain=require('../../domain/domain.js');
const express=require('express');
const bodyParser=require('body-parser');

const router=express.Router();

router.get('/list',function(req,res){

    let page=parseInt(req.query.page?req.query.page:1);
    page=page>0?page:1;
    let size=parseInt(req.query.size?req.query.size:10);
    size=size>0?size:5;

    domain.movie
        .findAndCountAll({
            offset:(page-1)*size,
            limit:size,
            order:[
                ['createdAt', 'desc'],
            ]
        })
        .then(movieResult=>{
            res.end(JSON.stringify(movieResult));
        })
        .catch(e=>{
            console.log(`[!] 异常发生：${e}`);
            res.end(JSON.stringify([]));
        });
});

router.post('/add',bodyParser.json() ,function(req,res){
    const movie=req.body;
    const _result={
        result:'SUCCESS',
        message:'',
    };
    domain.movie
        .create(Object.assign({},movie,{ }))
        .then(movie=>{
            res.end(JSON.stringify(_result));
        })
        .catch(e=>{
            console.log(e);
            _result.result="FAIL";
            _result.message="请求失败";
            res.end(JSON.stringify(_result));
        })
});

module.exports=router;