const express=require('express');
const bodyParser=require('body-parser');
const {roleService}=require('../../service');
const helper=require('../../utils/helper');
const {Middleware,message}=require('tiny-service');

const middleware=Middleware(roleService);


const router=express.Router();

router.post('/create',bodyParser.json(),
    function(req,res,next){
        const {record}=req.body;
        const {name,description}=record;
        if(!name || !description){
            return res.json(message.fail(`name and description required`));
        }
        next();
    },
    middleware.create
);

router.post('/remove',bodyParser.json(),
    function(req,res,next){
        const {id}=req.body;
        if(!id ){
            return res.json(message.fail('id required'));
        }
        next();
    },
    middleware.remove
);

router.post('/update',bodyParser.json(),
    function(req,res,next){
        const {record}=req.body;
        const {id,name,description}=record;
        if(!id || !name ||!description){
            return res.json(message.fail('id , name and description required'));
        }
        next();
    },
    middleware.update
);

router.post('/list',bodyParser.json(),
    middleware.list
);

router.post("/list-of-current-user",bodyParser.json(),function(req,res){
    let {page,size,condition}=req.body;
    page=helper.toPositiveInteger(page);
    size=helper.toPositiveInteger(size);
    roleService.listRolesOfUser(req.session.userid,page,size)
        .then((list)=>{
            console.log(list);
        })
});


router.post('/update-roles-of-username',bodyParser.json(),function(req,res){
    const info=req.body;
    const username=info.username;
    const roles=info.roles;
    console.log(req.body);
    const result={
        status:'SUCCESS',
        msg:'',
    };
    return roleService.updateRolesOfUsername(username,roles)
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
