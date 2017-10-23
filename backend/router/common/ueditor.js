/**
 * 用于配置UEditor的服务端
 */
const express=require('express');
const UEditor=require('express-ueditor');



const app=express();
const router=express.Router();
const ueditor=new UEditor();

router.use('/controller',ueditor.config());
router.use('/controller',ueditor.upload('uploadimage'));
router.use('/controller',ueditor.upload('uploadfile'));



module.exports=router;