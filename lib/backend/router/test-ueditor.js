const express=require('express');



const router=express.Router();

router.get('/',(req,res)=>{
    res.render('testueditor.html');
});



module.exports=router;