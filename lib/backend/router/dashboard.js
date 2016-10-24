/**
 * 后台管理路由器
 */
const express=require('express');
const checker=require('../service/auth/authorization-checker');



const router=express.Router();

router.use('/',checker.requireLogin());
router.get('/',(req,res)=>{
    res.render('dashboard.html');
});



module.exports=router;
