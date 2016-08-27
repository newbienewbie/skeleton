const express=require('express');
const path=require('path');
const domain=require('../domain/domain.js');


const router=express.Router();

router.get('/',function(req,res) {
    let session=req.session;
    res.render("index.html", {
        greetings:session.username
    });
});



module.exports=router;