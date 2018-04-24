const express=require('express');
const bodyParser=require('body-parser');
const {categoryService,postService}=require('../../service');
const {calculatePaginationInfo}=require('pagination-info');
const {Middleware,message}=require('tiny-service');

const middleware=Middleware(postService);
const jsonMiddleware=bodyParser.json();


function preCreate(req,res,next){
    const {record}=req.body;
    record.authorId=req.session.userid;
    record.state='draft';
    record.categoryId=parseInt(record.categoryId);
    if(Array.isArray(record.featureImageUrl)){
        record.featureImageUrl=record.featureImageUrl[0].url;
    }
    next();
}

function preUpdate(req,res,next){
    const {record}=req.body;
    record.authorId=req.session.userid;
    record.state='draft';
    record.categoryId=parseInt(record.categoryId);
    if(Array.isArray(record.featureImageUrl)){
        record.featureImageUrl=record.featureImageUrl[0].url;
    }
    next();
}

function detail(req,res){
    const id=req.query.id;
    postService.findById(id).then((post)=>{
        delete post.password;
        res.json(post);
    })
}

function checkCanPublish(req){
    // 检查当前用户和当前文章作者是否是同一人
    // 
    const userId=req.session.userId;
}

/**
 * 发表
 */
function publish(req,res){
    const id=req.query.id;
    return postService.publish(id)
        .then(()=>{
            res.json(message.success());
        }).then((err)=>{
            res.json(message.fail(err));
        });
}

/**
 * 审批
 */
function approval(req,res){
    const id=req.query.id;
    return postService.approval(id)
        .then(()=>{
            res.end(JSON.stringify(info));
        }).then((err)=>{
            res.json(message.fail(err));
        });
}

/**
 * 退回
 */
function sendback(req,res){
    const id=req.query.id;
    return postService.sendback(id)
        .then(()=>{
            res.json(message.success());
        }).then((err)=>{
            res.json(message.fail(err));
        });
}

/**
 * 否决
 */
function reject(req,res){
    const id=req.query.id;
    return postService.reject(id)
        .then(()=>{
            res.json(message.success());
        }).then((err)=>{
            res.json(message.fail(err));
        });
}

function detailPage(req,res){
    const id=req.params.id;
    let categories=[];

    categoryService.tree({
        'scope':'post'
    })
    .then(list=>{
        categories=list;
    })
    .then(_=>{
        return postService.findById(id)
    })
    .then((post)=>{
        delete post.password;
        
        res.render("post/detail.njk",{
            categories,
            convertCategoryIdToHref:id=>`/ebook?categoryId=${id}`,
            post,
        });
    });
}
function index(req,res){
    let {categoryId,page,size}=req.query;
    page=page?parseInt(page):1;
    page=page>0?page:1;
    size=size?parseInt(size):8;
    size=size>0?size:8;

    let categories=[];
    let posts={rows:[],count:0}; 
    postService.recent(categoryId,page,size)
        .then((results)=>{
            posts=results;
        })
        .then(_=>{
            return categoryService.tree({
                scope:'post'
            })
            .then(list=>{
                categories=list;
            });
        })
        .then(_=>{
            const pagesInfo=calculatePaginationInfo(posts.count,size,page,5);
            res.render("post/index.njk",{
                posts,
                pagesInfo,
                categories,
                convertPageToHref:page=>{
                    const conditions=[ `page=${page}`, `size=${size}`, ];
                    if(categoryId){
                        conditions.push(`categoryId=${categoryId}`);
                    }
                    return `/post?${conditions.join('&')}`
                },
                convertCategoryIdToHref:id=>`/post?categoryId=${id}`,
            }); 

        });

}

const routes={
    'create':{
        method:'post',
        path:'/create',
        middlewares:[ jsonMiddleware,preCreate, middleware.create ],
        allowRoles:['ROLE_CMS_AUTHOR','ROLE_CMS_EDITOR','ROLE_CMS_ADMIN'],
    },
    'remove':{
        method:'post',
        path:'/remove',
        middlewares:[jsonMiddleware,middleware.remove],
        allowRoles:['ROLE_CMS_AUTHOR','ROLE_CMS_EDITOR','ROLE_CMS_ADMIN'],
    },
    'update':{
        method:'post',
        path:'/update',
        middlewares:[jsonMiddleware,preUpdate,middleware.update],
        allowRoles:['ROLE_CMS_AUTHOR','ROLE_CMS_EDITOR','ROLE_CMS_ADMIN'],
    },
    'detail':{
        method:'get',
        path:'/detail',
        middlewares:[jsonMiddleware,detail],
    },
    'list':{
        method:'post',
        path:'/list',
        middlewares:[jsonMiddleware,middleware.list],
    },
    'recent':{
        method:'post',
        path:'/recent',
        middlewares:[jsonMiddleware,middleware.recent],
    },
    'publish':{
        method:'post',
        path:'/publish',
        middlewares:[jsonMiddleware,publish],
        allowRoles:['ROLE_CMS_EDITOR','ROLE_CMS_ADMIN'],
    },
    'sendback':{
        method:'post',
        path:'/sendback',
        middlewares:[jsonMiddleware,sendback],
        allowRoles:['ROLE_CMS_EDITOR','ROLE_CMS_ADMIN'],
    },
    'approval':{
        method:'post',
        path:'/approval',
        middlewares:[jsonMiddleware,approval],
        allowRoles:['ROLE_CMS_EDITOR','ROLE_CMS_ADMIN'],
    },
    'reject':{
        method:'post',
        path:'/reject',
        middlewares:[jsonMiddleware,reject],
        allowRoles:['ROLE_CMS_EDITOR','ROLE_CMS_ADMIN'],
    },
    'detail-page':{
        method:'get',
        path:'/detail/:id',
        middlewares:[jsonMiddleware,detailPage],
    },
    'index':{
        method:'get',
        path:'/',
        middlewares:[index],
    }
};


module.exports={
    mount:'/post',
    routes,
};