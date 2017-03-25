const express=require('express');
const bodyParser=require('body-parser');
const checker=require('../service/auth/authorization-checker');
const commentService=require('../service/comment');

const router=express.Router();

router.post('/list',bodyParser.json(),function(req,res,next){
    let {scope,topicId,page,size,replyTo}=req.body;
    topicId=parseInt(topicId);
    page=page?parseInt(page):1;
    page=page>0?page:1;
    size=size?parseInt(size):10;
    size=size>0?size:10;
    if(!replyTo){
        replyTo=null;
    }
    commentService.listByTopicId(scope,topicId,replyTo,page,size)
        .then(result=>{
            res.end(JSON.stringify(result));
        });
});

router.post('/new',checker.requireLogin());
router.post('/new',bodyParser.json(),function(req,res,next){
    const {scope,topicId,content}=req.body;
    const authorId=req.session.userid;
    if(!content || !topicId || !authorId){ 
        const info={msg:'必须提供content、topicId、authorId',status:'FAIL'};
        res.end(JSON.stringify(info));
        return;
    }
    const comment={ content,scope, topicId, authorId, };
    commentService.create(comment)
        .then(c=>{
            res.end(JSON.stringify(c));
        });
});

module.exports=router;