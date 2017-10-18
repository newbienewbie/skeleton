const express=require('express');
const bodyParser=require('body-parser');
const postService=require('../service/post');
const categoryService=require('../service/category');
const {calculatePaginationInfo}=require('pagination-info');
const {Middleware,message}=require('tiny-service');

const router=express.Router();
const middleware=Middleware(postService);


router.post("/create", bodyParser.json(),
    (req,res,next)=>{
        const {record}=req.body;
        record.authorId=req.session.userid;
        record.state='draft';
        record.categoryId=parseInt(record.categoryId);
        if(Array.isArray(record.featureImageUrl)){
            record.featureImageUrl=record.featureImageUrl[0].url;
        }
        next();
    },
    middleware.create
);

router.post('/remove',bodyParser.json(),middleware.remove);

router.post("/update",
    bodyParser.json(),
    (req,res,next)=>{
        const {record}=req.body;
        record.authorId=req.session.userid;
        record.state='draft';
        record.categoryId=parseInt(record.categoryId);
        if(Array.isArray(record.featureImageUrl)){
            record.featureImageUrl=record.featureImageUrl[0].url;
        }
        next();
    },
    middleware.update
);


router.get('/detail',
    (req,res)=>{
        const id=req.query.id;
        postService.findById(id).then((post)=>{
            delete post.password;
            res.json(post);
        })
    }
);


router.post('/list', bodyParser.json(), middleware.list);

router.post('/recent',bodyParser.json(),middleware.recent);

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
    return postService.publish(id)
        .then(()=>{
            res.json(message.success());
        }).then((err)=>{
            res.json(message.fail(err));
        });
});

/**
 * 审批
 */
router.post("/approval",function(req,res){
    const id=req.query.id;
    return postService.approval(id)
        .then(()=>{
            res.end(JSON.stringify(info));
        }).then((err)=>{
            res.json(message.fail(err));
        });
});

/**
 * 退回
 */
router.post("/sendback",function(req,res){
    const id=req.query.id;
    return postService.sendback(id)
        .then(()=>{
            res.json(message.success());
        }).then((err)=>{
            res.json(message.fail(err));
        });
});

/**
 * 否决
 */
router.post("/reject",function(req,res){
    const id=req.query.id;
    return postService.reject(id)
        .then(()=>{
            res.json(message.success());
        }).then((err)=>{
            res.json(message.fail(err));
        });
});




router.get("/detail/:id",(req,res)=>{
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
});




router.get("/",function(req,res){
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

});

module.exports=router;