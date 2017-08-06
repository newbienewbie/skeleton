const express=require('express');
const bodyParser=require('body-parser');
const roleService=require('../service/account/role-service.js');
const checker=require('../service/auth/authorization-checker');



const router=express.Router();


router.use('/list',checker.requireAnyRole(['ROLE_ADMIN','ROLE_ROOT']));
router.use('/list',function(req,res){
    roleService.listAll()
        .then((roles)=>{
            res.end(JSON.stringify(roles));
        })
        .catch(e=>{
            res.end(JSON.stringify({
                error:'错误',
            }));
            console.log(e);
        });
});


router.post('/update',checker.requireAnyRole(['ROLE_ADMIN','ROLE_ROOT']));
router.post('/update',bodyParser.json(),function(req,res){
    const info=req.body;
    const username=info.username;
    const roles=info.roles;
    console.log(req.body);
    const result={
        status:'SUCCESS',
        msg:'',
    };
    roleService.update(username,roles)
        .then(()=>{
            res.end(JSON.stringify(result));
        })
        .catch((e)=>{
            result.status="FAIL";
            result.msg=e;
            res.end(JSON.stringify(result));
        });
});



module.exports=router;