const express=require('express');
const bodyParser=require('body-parser');
const {commentService}=require('../service');
const {toIntegerGreaterThan}=require('tiny-service');



const jsonMiddleware=bodyParser.json();

/**
 * 列出某分页下的评论的前N条回复及计数
 */
function replyListOfPage(req,res,next){
    let {scope,topicId,page,size,replyPageSize}=req.body;
    topicId=parseInt(topicId);
    page=page?parseInt(page):1;
    page=page>0?page:1;
    size=size?parseInt(size):10;
    size=size>0?size:10;
    replyPageSize=parseInt(replyPageSize);
    replyPageSize=replyPageSize>0?replyPageSize:10;
    const currentUserId=req.session.userid;
    return commentService.listAllReplies(scope,topicId,page,size,replyPageSize,currentUserId)
        .then(list=>{
            res.end(JSON.stringify(list));
        });
}

/**
 * 根据指定分页条件，获取相应评论列表或者回复列表
 * 如果指定replyUnder，则返回指定replyUnder下的回复列表
 * 否则，根据topicId查询其他相应条件下(如page、size、和replyTo)的评论或回复
 */
function list(req,res,next){
    let {scope,topicId,page,size,replyTo,replyUnder}=req.body;
    topicId=parseInt(topicId);
    page=page?parseInt(page):1;
    page=page>0?page:1;
    size=size?parseInt(size):10;
    size=size>0?size:10;
    if(!replyTo){
        replyTo=null;
    }
    let p=null;
    const currentUserId=req.session.userid;
    // 如果指定了 replyUnder 且 不为 null，则意味着是要获取某个顶级评论下的所有回复
    if(!!replyUnder){
        p=commentService.listByReplyUnder(scope,topicId,replyUnder,page,size,currentUserId);
    }
    else{
        p=commentService.listByTopicId(scope,topicId,replyTo,page,size,currentUserId)
    }

    return p.then(result=>{
            res.end(JSON.stringify(result));
        });
}

function create(req,res,next){
    const {scope,topicId,replyTo,content}=req.body;
    const authorId=req.session.userid;
    if(!content || !topicId || !authorId){ 
        const info={msg:'必须提供content、topicId、authorId',status:'FAIL'};
        res.end(JSON.stringify(info));
        return;
    }
    const info={scope,topicId,replyTo,content,authorId};
    return commentService.createCommentOrReply(info)
        .then(
            c=>{
                res.end(JSON.stringify(c));
            },
            reason=>{
                res.end(JSON.stringify({status:'fail',msg:reason}));
            }
        );
}

function upvoteCancel(req,res,next){
    const {id}=req.body;
    const userId=req.session.userid;
    if(!id || !userId){ 
        const info={msg:'id、userId must be provided',status:'FAIL'};
        res.end(JSON.stringify(info));
        return;
    }
    commentService.cancelLike(userId,id)
        .then(i=>{
            res.end(JSON.stringify(i));
        })
}

function upvote(req,res,next){
    const {id}=req.body;
    const userId=req.session.userid;
    if(!id || !userId){ 
        const info={msg:'id、userId must be provided',status:'FAIL'};
        res.end(JSON.stringify(info));
        return;
    }
    commentService.like(userId,id)
        .then(i=>{
            res.end(JSON.stringify(i));
        })
    
}

function downvoteCancel(req,res,next){
    const {id}=req.body;
    const userId=req.session.userid;
    if(!id || !userId){ 
        const info={msg:'id、userId must be provided',status:'FAIL'};
        res.end(JSON.stringify(info));
        return;
    }
    commentService.cancelHate(userId,id)
        .then(i=>{
            res.end(JSON.stringify(i));
        })
    
}

function downvote(req,res,next){
    const {id}=req.body;
    const userId=req.session.userid;
    if(!id || !userId){ 
        const info={msg:'id、userId must be provided',status:'FAIL'};
        res.end(JSON.stringify(info));
        return;
    }
    commentService.hate(userId,id)
        .then(i=>{
            res.end(JSON.stringify(i));
        })
    
}

const routes={
    'reply-list-of-page':{
        method:'post',
        path:'/list/reply-list-of-page',
        middlewares:[ jsonMiddleware, replyListOfPage ],
        allowRoles:['ROLE_ANONYMOUS','ROLE_USER'],
    },
    'list':{
        method:'post',
        path:'/list',
        middlewares:[ jsonMiddleware, list ],
        allowRoles:['ROLE_ANONYMOUS','ROLE_USER'],
    },
    'create':{
        method:'post',
        path:'/new',
        middlewares:[ jsonMiddleware, create ],
        allowRoles:['ROLE_USER'],
    },
    'upvote-cancel':{
        method:'post',
        path:'/upvote/cancel',
        middlewares:[ jsonMiddleware, upvoteCancel ],
        allowRoles:['ROLE_USER'],
    },
    'upvote':{
        method:'post',
        path:'/upvote',
        middlewares:[ jsonMiddleware, upvote],
        allowRoles:['ROLE_USER'],
    },
    'downvote-cancel':{
        method:'post',
        path:'/downvote/cancel',
        middlewares:[ jsonMiddleware, downvoteCancel ],
        allowRoles:['ROLE_USER'],
    },
    'downvote':{
        method:'post',
        path:'/downvote',
        middlewares:[ jsonMiddleware, downvote ],
        allowRoles:['ROLE_USER'],
    },

};

module.exports={
    mount:'/comment',
    routes,
};