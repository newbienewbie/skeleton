const express=require('express');
const {categoryService}=require('../../service');


const router=express.Router();

router.use('/list/:scope',(req,res,next)=>{
    const scope=req.params.scope?req.params.scope:"post";
    categoryService.listAll({
        'scope':scope
    }).then(list=>{
        res.end(JSON.stringify(list));
    });
});

router.use('/tree/:scope',(req,res,next)=>{
    const scope=req.params.scope?req.params.scope:"post";
    categoryService.tree({
        'scope':scope
    }).then(list=>{
        res.end(JSON.stringify(list));
    });
});

module.exports=router;