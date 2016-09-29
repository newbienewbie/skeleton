/**
 * 后台管理路由器
 */
const express=require('express');
const check=require('../service/auth/check.js');



const router=express.Router();

router.use('/',check.checkLogin());
router.get('/',(req,res)=>{
    res.render('dashboard.html');
});



module.exports=router;
