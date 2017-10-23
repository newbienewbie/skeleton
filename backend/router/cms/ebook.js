const express=require('express');
const bodyParser=require('body-parser');
const {categoryService,ebookService}=require('../../service');
const {calculatePaginationInfo}=require('pagination-info');
const {Middleware,message}=require('tiny-service');



const router=express.Router();
const middleware=Middleware(ebookService);

router.post("/create",bodyParser.json(),
    (req,res,next)=>{
        const {ebook}=req.body;
        ebook.uploaderId=req.session.userid;
        ebook.state='draft';
        ebook.categoryId=parseInt(ebook.categoryId);
        req.body.record=ebook;
    },
    middleware.create
);

router.post("/update",bodyParser.json(),
    (req,res,next)=>{
        const {record}=req.body;
        post.authorId=req.session.userid;
        post.state='draft';
        post.categoryId=parseInt(post.categoryId);

    },
    middleware.update
);


router.get('/detail',(req,res)=>{
    const id=req.query.id;
    ebookService.findById(id).then((post)=>{
        delete post.password;
        res.json(post);
    })
});


router.post('/list',  bodyParser.json(), middleware.list);

router.post('/recent',bodyParser.json(), middleware.recent);


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
    return ebookService.publish(id)
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
    return ebookService.approval(id)
        .then(()=>{
            res.json(message.success());
        }).then((err)=>{
            res.json(message.fail(err));
        });
});

/**
 * 退回
 */
router.post("/sendback",function(req,res){
    const id=req.query.id;
    return ebookService.sendback(id)
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
    return ebookService.reject(id)
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
});

router.get('/',(req,res)=>{
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
});


module.exports=router;