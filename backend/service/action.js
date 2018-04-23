const {CategoryService}=require('tiny-service');
const domain=require('../domain');


const service=CategoryService(domain.action);




module.exports=service;