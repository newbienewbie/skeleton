const sysInfo=require('../../utils/sys-info');
const express=require('express');


const router=express.Router();

router.get('/gen',function (req,res) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'no-cache, no-store');
    res.end(JSON.stringify(sysInfo.gen()));
});

router.get('/poll',function (req,res) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'no-cache, no-store');
    res.end(JSON.stringify(sysInfo.poll()));
});



module.exports=router;