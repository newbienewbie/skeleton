const express=require('express');
const bodyParser=require('body-parser');
const checker=require('../service/auth/authorization-checker');
const postService=require('../service/post');



const router=express.Router();

router.post("/new",checker.requireLogin(),bodyParser.json(),(req,res)=>{
    const post=req.body;
    post.authorId=req.session.userid;
    post.state='draft';
    post.categoryId=parseInt(post.categoryId);
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
        publishedAt:'2013-01-01',
        isMarkdown:true,
        content:'# 都他妈是套路',
    };
    res.send(JSON.stringify(post));
});


router.post('/list',
    checker.requireLogin(),
    bodyParser.json(),
    (req,res)=>{
        const info=req.body;
        let page=info.page;
        page=parseInt(page);
        page=page>0?page:1;

        let size=info.size;
        size=parseInt(size);
        size=size>0?size:1;

        let condition=info.condition;
        return postService.list(page,size,condition)
            .then((results)=>{
                const json=JSON.stringify(results);
                res.end(json);
            });
    }
);



function checkCanPublish(req){
    // 检查当前用户和当前文章作者是否是同一人
    // 
    const userId=req.session.userId;
}

/**
 * 发表
 */
router.post("/publish",function(req,res){
    const id=req.query.id;
    const info={ status:'SUCCESS',msg:'' };
    return postService.publish(id)
        .then(()=>{
            res.end(JSON.stringify(info));
        }).then((err)=>{
            info.status='FAIL';
            info.msg=err;
            res.end(JSON.stringify(err));
        });
});

module.exports=router;