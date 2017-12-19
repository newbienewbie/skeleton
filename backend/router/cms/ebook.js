const express=require('express');
const bodyParser=require('body-parser');
const {categoryService,ebookService}=require('../../service');
const {calculatePaginationInfo}=require('pagination-info');
const {Middleware,message}=require('tiny-service');



const middleware=Middleware(ebookService);
const jsonMiddleware=bodyParser.json();


function preCreate(req,res,next){
    const {ebook}=req.body;
    ebook.uploaderId=req.session.userid;
    ebook.state='draft';
    ebook.categoryId=parseInt(ebook.categoryId);
    req.body.record=ebook;
    next();
}

function preUpdate(req,res,next){
    const {record}=req.body;
    record.authorId=req.session.userid;
    record.state='draft';
    record.categoryId=parseInt(record.categoryId);
    next();
}

function detail(req,res){
    const id=req.query.id;
    ebookService.findById(id).then((post)=>{
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
    return ebookService.publish(id)
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
    return ebookService.approval(id)
        .then(()=>{
            res.json(message.success());
        }).then((err)=>{
            res.json(message.fail(err));
        });
}

/**
 * 退回
 */
function sendback(req,res){
    const id=req.query.id;
    return ebookService.sendback(id)
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
    return ebookService.reject(id)
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
        'scope':'ebook'
    })
    .then(list=>{
        categories=list;
    })
    .then(_=>{
        return ebookService.findById(id)
    })
    .then((ebook)=>{
        delete ebook.password;
        res.render("ebook/detail.njk",{
            categories,
            convertCategoryIdToHref:id=>`/ebook?categoryId=${id}`,
            ebook,
        });
    });
}

function index(req,res){
    let {categoryId,page,size}=req.query;
    page=page?parseInt(page):1;
    size=size?parseInt(size):8;


    let categories=[];
    let ebooks={rows:[],count:0};

    ebookService.recent(categoryId,page,size)
        .then(list=>{
            ebooks=list;
        })
        .then(_=>{
            return categoryService.tree({
                'scope':'ebook'
            });
        })
        .then(list=>{
            categories=list;
        })
        .then(_=>{
            const pagesInfo=calculatePaginationInfo(ebooks.count,size,page,5);
            res.render("ebook/index.njk",{
                ebooks,
                pagesInfo,
                categories,
                convertPageToHref:page=>{
                    const conditions=[
                        `page=${page}`,
                        `size=${size}`,
                    ];
                    if(categoryId){
                        conditions.push(`categoryId=${categoryId}`);
                    }
                    return `/ebook?${conditions.join('&')}`
                },
                convertCategoryIdToHref:id=>`/ebook?categoryId=${id}`,
            });
        });
}

const routes={
    'create':{
        method:'post',
        path:'/create',
        middlewares:[ jsonMiddleware,preCreate, middleware.create ],
    },
    'remove':{
        method:'post',
        path:'/remove',
        middlewares:[jsonMiddleware,middleware.remove],
    },
    'update':{
        method:'post',
        path:'/update',
        middlewares:[jsonMiddleware,preUpdate,middleware.update],
    },
    'detail':{
        method:'get',
        path:'/detail',
        middlewares:[detail],
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
        middlewares:[publish],
    },
    'sendback':{
        method:'post',
        path:'/sendback',
        middlewares:[sendback],
    },
    'approval':{
        method:'post',
        path:'/approval',
        middlewares:[approval],
    },
    'reject':{
        method:'post',
        path:'/reject',
        middlewares:[reject],
    },
    'detail-page':{
        method:'get',
        path:'/detail/:id',
        middlewares:[detailPage],
    },
    'index':{
        method:'get',
        path:'/',
        middlewares:[index],
    }
};

module.exports={
    mount:'/ebook',
    routes,
};