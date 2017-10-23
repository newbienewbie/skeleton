/**
 * 后台管理路由器
 */
const express=require('express');



const router=express.Router();

router.get('/',(req,res)=>{
    res.render('dashboard.html');
});



module.exports=router;
