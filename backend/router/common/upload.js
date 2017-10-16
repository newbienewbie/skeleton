const UEditor=require('express-ueditor');
const express=require('express');
const checker=require('../../service/auth/authorization-checker');

const router=express.Router();
const ueditor=new UEditor({
    videoMaxSize:5*1014*1024*1024,
});

router.post('/image',checker.requireLogin());
router.post("/image",ueditor.upload("uploadimage"));

router.post('/video',checker.requireLogin());
router.post("/video",ueditor.upload("uploadvideo"));


module.exports=router;


