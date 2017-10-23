const express=require('express');
const path=require('path');


const router=express.Router();

router.get('/',function(req,res) {
    let session=req.session;
    res.render("index.njk", {
        greetings:session.username
    });
});



module.exports=router;