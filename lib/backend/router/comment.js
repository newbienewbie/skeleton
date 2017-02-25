const express=require('express');
const bodyParser=require('body-parser');
const checker=require('../service/auth/authorization-checker');
const commentService=require('../service/comment');

const router=express.Router();

router.post('/list',bodyParser.json(),function(req,res,next){
    const info=req.body;
    console.log('info is :',req.body);
    let _page=info.page?parseInt(info.page):1;
    let _size=info.size?parseInt(info.size):10;
    _page=_page>0?_page:1;
    _size=_size>0?_size:10;
    
    commentService.listByTopicId(info.topicId,_page,_size)
        .then(result=>{
            res.end(JSON.stringify(result));
        });
});

module.exports=router;