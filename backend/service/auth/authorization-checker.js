const Security=require('express-security');

const interceptor=new Security.AuthInterceptor(); 

module.exports=interceptor;