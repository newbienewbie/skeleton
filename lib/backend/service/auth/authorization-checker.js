const Security=require('express-security');



const checker=new Security.AuthorizationChecker() 

module.exports=checker;