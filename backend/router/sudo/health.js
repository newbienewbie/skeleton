/**
 * OpenShift需要的指示健康与否的文件
 */
const express=require('express');



const router=express.Router();

router.get('/',function (req,res) {
    res.writeHead(200);
    res.end("1");
});



module.exports=router;
