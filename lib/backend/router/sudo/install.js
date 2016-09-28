const fs=require('fs');
const path=require('path');
const installService=require('../../service/install/index.js');
const domain=require('../../domain/domain.js');
const express=require('express');



var router=express.Router();

router.get('/',(req,res)=>{
    // installService.install()
    //     .then(
    //         ()=>{
    //             res.end(`succeeded!`);
    //         },
    //         (reason)=>{
    //             console.log(reason);
    //             res.end(`<meta charset='utf-8'/>faild!${reason}`);
    //         }
    //     );

    res.render('install.html',{});

});



module.exports=router;