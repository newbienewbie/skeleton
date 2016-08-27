/**
 * 后台管理路由器
 */
const express=require('express');
const check=require('../auth/check.js');



const router=express.Router();

// router.use('/',check.checkRole('ROLE_ADMIN'));
router.get('/',(req,res)=>{
    res.render('dashboard.html');
});



module.exports=router;
