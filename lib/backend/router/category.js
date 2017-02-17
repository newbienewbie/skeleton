const express=require('express');
const categoryService=require('../service/category');


const router=express.Router();

router.use('/list',(req,res,next)=>{
    categoryService.listAll()
        .then(list=>{
            res.end(JSON.stringify(list));
        });
});


module.exports=router;