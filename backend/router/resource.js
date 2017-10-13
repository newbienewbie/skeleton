const express=require('express');
const bodyParser=require('body-parser');
const resourceService=require('../service/account/resource-service');
const {Middleware}=require('tiny-service');



const router=express.Router();
const middleware=Middleware(resourceService);


router.post('/create',bodyParser.json(),middleware.create);


router.post('/remove',bodyParser.json(),middleware.remove);


router.post('/update',bodyParser.json(),middleware.update);


router.post('/list',bodyParser.json(),middleware.list);


router.post('/recent',bodyParser.json(),middleware.recent);


module.exports=router;