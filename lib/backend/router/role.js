const express=require('express');
const domain=require('../domain/domain.js');



const router=express.Router();
router.use('/list',function(req,res){
    domain.role.findAll()
        .then((roles)=>{
            res.end(JSON.stringify(roles));
        })
        .catch(e=>{
            res.end(JSON.stringify({
                error:'错误',
            }));
            console.log(e);
        });
});




module.exports=router;
