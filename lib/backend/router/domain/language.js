const domain=require('../../domain/domain.js');
const express=require('express');
const bodyParser=require('body-parser');

const router=express.Router();

router.get('/list',function(req,res){
    domain.language
        .findAll()
        .then((lanList)=>{
            res.end(JSON.stringify(lanList));
        }).catch(e=>{
            res.end(JSON.stringify({
                msg:'读取language错误',
            }));
        });
});


module.exports=router;