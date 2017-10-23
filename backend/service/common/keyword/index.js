const {Service}=require('./service');

/**
 * 指定特定领域
 */
function filter(domainString="post"){
   return new Service(domainString); 
}


module.exports=filter;