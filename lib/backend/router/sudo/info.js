const sysInfo=require('../../utils/sys-info');
const checker=require('../../service/auth/authorization-checker');
const express=require('express');


const router=express.Router();

router.use('/gen',checker.requireAnyRole(["ROLE_ADMIN","ROLE_ROOT"]));
router.get('/gen',function (req,res) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'no-cache, no-store');
    res.end(JSON.stringify(sysInfo.gen()));
});

router.use('/poll',checker.requireAnyRole(["ROLE_ADMIN","ROLE_ROOT"]));
router.get('/poll',function (req,res) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'no-cache, no-store');
    res.end(JSON.stringify(sysInfo.poll()));
});



module.exports=router;