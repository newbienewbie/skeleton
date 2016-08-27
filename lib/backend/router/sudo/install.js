const domain=require('../../domain/domain.js');
const express=require('express');



var router=express.Router();

router.get('/',(req,res)=>{
    domain.sequelize.sync({
        force:true
    }).then(()=>{
        res.send('database initialized');
    }).catch(e=>{
        res.send(e);
    });
});



module.exports=router;