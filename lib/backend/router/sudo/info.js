const sysInfo=require('../../utils/sys-info');
const check=require('../../auth/check.js');
const express=require('express');


const router=express.Router();

router.use('/gen',check.checkLogin());
router.get('/gen',function (req,res) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'no-cache, no-store');
    res.end(JSON.stringify(sysInfo.gen()));
});

router.use('/poll',check.checkAllRoles(["ROLE2","ROLE1"]));
router.get('/poll',function (req,res) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'no-cache, no-store');
    res.end(JSON.stringify(sysInfo.poll()));
});



module.exports=router;