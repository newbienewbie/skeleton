const express=require('express');



const router=express.Router();

router.get('/detail',(req,res)=>{
    const id=req.query.id;
    const post={
        id:'3',
        title:'测试',
        author:"陈乏",
        pubdate:'2013-01-01',
        isMarkdown:true,
        content:'# 都他妈是套路',
    };
    res.send(JSON.stringify(post));
});



module.exports=router;