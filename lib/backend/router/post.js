const express=require('express');
const bodyParser=require('body-parser');
const checker=require('../service/auth/authorization-checker');
const postService=require('../service/post');



const router=express.Router();

router.post("/new",checker.requireLogin(),bodyParser.json(),(req,res)=>{
    const post=req.body;
    post.authorId=req.session.userid;
    post.state='draft';
    post.colId=parseInt(post.colId);
    const info={ status:'SUCCESS',msg:'' };
    postService.create(post)
        .then(()=>{
            res.end(JSON.stringify(info));
        })
        .catch(e=>{
            info.status="error"; info.msg=e;
            res.end(JSON.stringify(info));
        });
});

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