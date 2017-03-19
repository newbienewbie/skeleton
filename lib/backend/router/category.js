const express=require('express');
const categoryService=require('../service/category');


const router=express.Router();

router.use('/list/:domain',(req,res,next)=>{
    const domain=req.params.domain?req.params.domain:"post";
    categoryService.listAll({
        'domain':domain
    }).then(list=>{
        res.end(JSON.stringify(list));
    });
});

router.use('/tree/:domain',(req,res,next)=>{
    const domain=req.params.domain?req.params.domain:"post";
    categoryService.tree({
        'domain':domain
    }).then(list=>{
        res.end(JSON.stringify(list));
    });
});

module.exports=router;