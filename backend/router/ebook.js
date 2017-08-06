const express=require('express');
const bodyParser=require('body-parser');
const checker=require('../service/auth/authorization-checker');
const ebookService=require('../service/ebook');
const categoryService=require('../service/category');
const {calculatePaginationInfo}=require('pagination-info');



const router=express.Router();

router.post("/new",checker.requireLogin(),bodyParser.json(),(req,res)=>{
    const ebook=req.body;
    ebook.uploaderId=req.session.userid;
    ebook.state='draft';
    ebook.categoryId=parseInt(ebook.categoryId);
    const info={ status:'SUCCESS',msg:'' };
    ebookService.create(ebook)
        .then(()=>{
            res.end(JSON.stringify(info));
        })
        .catch(e=>{
            info.status="error"; info.msg=e;
            res.end(JSON.stringify(info));
        });
});

router.post("/edit",checker.requireLogin(),bodyParser.json(),(req,res)=>{
    const post=req.body;
    post.authorId=req.session.userid;
    post.state='draft';
    post.categoryId=parseInt(post.categoryId);
    const info={ status:'SUCCESS',msg:'' };
    ebookService.edit(post)
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
    ebookService.findById(id).then((post)=>{
        delete post.password;
        res.send(JSON.stringify(post));
    })
});


router.post('/list', checker.requireLogin(), bodyParser.json(), (req,res)=>{
    const info=req.body;
    let page=info.page;
    page=parseInt(page);
    page=page>0?page:1;

    let size=info.size;
    size=parseInt(size);
    size=size>0?size:1;

    let condition=info.condition;
    return ebookService.list(page,size,condition)
        .then((results)=>{
            const json=JSON.stringify(results);
            res.end(json);
        });
});

router.post('/recent',bodyParser.json(),function(req,res,next){
    const {categoryId,page,size}=req.body;
    ebookService.recent(categoryId,page,size).then(list=>{
        res.end(JSON.stringify(list));
    });
});

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
    return ebookService.publish(id)
        .then(()=>{
            res.end(JSON.stringify(info));
        }).then((err)=>{
            info.status='FAIL';
            info.msg=err;
            res.end(JSON.stringify(err));
        });
});

/**
 * 审批
 */
router.post("/approval",function(req,res){
    const id=req.query.id;
    const info={ status:'SUCCESS',msg:'' };
    return ebookService.approval(id)
        .then(()=>{
            res.end(JSON.stringify(info));
        }).then((err)=>{
            info.status='FAIL';
            info.msg=err;
            res.end(JSON.stringify(err));
        });
});

/**
 * 退回
 */
router.post("/sendback",function(req,res){
    const id=req.query.id;
    const info={ status:'SUCCESS',msg:'' };
    return ebookService.sendback(id)
        .then(()=>{
            res.end(JSON.stringify(info));
        }).then((err)=>{
            info.status='FAIL';
            info.msg=err;
            res.end(JSON.stringify(err));
        });
});

/**
 * 否决
 */
router.post("/reject",function(req,res){
    const id=req.query.id;
    const info={ status:'SUCCESS',msg:'' };
    return ebookService.reject(id)
        .then(()=>{
            res.end(JSON.stringify(info));
        }).then((err)=>{
            info.status='FAIL';
            info.msg=err;
            res.end(JSON.stringify(err));
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