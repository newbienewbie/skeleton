const domain=require('../../domain');
const express=require('express');
const bodyParser=require('body-parser');



function list(req,res){
    domain.country.findAll()
        .then(countryList=>{
            res.end(JSON.stringify(countryList));
        })
        .catch(e=>{
            res.end(JSON.stringify({
                msg:'读取country错误',
            }));
        });
}

const routes={
    'list':{
        method:'get',
        path:'/list',
        middlewares:[ list ],
        allowRoles:['ROLE_ANONYMOUS','ROLE_USER'],
    }
};

module.exports={
    mount:'/country',
    routes,
};