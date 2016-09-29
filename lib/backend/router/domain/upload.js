const UEditor=require('express-ueditor');
const express=require('express');
const check=require('../../service/auth/check');

const router=express.Router();
const ueditor=new UEditor({
    videoMaxSize:5*1014*1024*1024,
});

router.post('/image',check.checkLogin());
router.post("/image",ueditor.upload("uploadimage"));

router.post('/video',check.checkLogin());
router.post("/video",ueditor.upload("uploadvideo"));


module.exports=router;


