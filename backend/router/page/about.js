const express=require('express');

const router=express.Router();


router.get('/',function(req,res) {
    let session=req.session;
    res.render("about/index.njk", {
        items:[
            {
                imgSrc:"/static/img/lusuirenmangmang.jpg",
                title:"攻城狮",
                description:"这家伙很懒，什么都没留下",
                moreUrl:""
            },
            {
                imgSrc:"/static/img/lusuirenmangmang.jpg",
                title:"射鸡师",
                description:"这家伙很懒，什么都没留下",
                moreUrl:""
            }
        ]
    });
});

module.exports=router;