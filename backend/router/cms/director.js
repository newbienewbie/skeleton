const express=require('express');
const bodyParser=require('body-parser');
const util=require('util');

const domain=require('../../domain');
const checker=require('../../service/auth/authorization-checker');

const router=express.Router();

const _result={
    result:'SUCCESS',
    msg:'',
};


router.post('/add',checker.requireLogin());
router.post("/add",bodyParser.json(),function(req,res){
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
});

module.exports=router;