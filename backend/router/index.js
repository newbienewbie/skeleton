const express=require('express');
const path=require('path');
const checker=require('../service/auth/authorization-checker');


const router=express.Router();

router.get('/',checker.requireLogin("/account"));
router.get('/',function(req,res) {
    let session=req.session;
    res.render("index.njk", {
        greetings:session.username
    });
});



module.exports=router;