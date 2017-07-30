const domain=require('../domain');
const express=require('express');
const bodyParser=require('body-parser');

const router=express.Router();


router.get('/list',function(req,res){
    domain.country
        .findAll()
        .then((countryList=>{
            res.end(JSON.stringify(countryList));
        }))
        .catch(e=>{
            res.end(JSON.stringify({
                msg:'读取country错误',
            }));
        });
});


module.exports=router;