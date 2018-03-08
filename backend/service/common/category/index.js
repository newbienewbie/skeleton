const domain=require('../../../domain');
const {CategoryService}=require('tiny-service');

const categoryService=CategoryService(domain.category);

console.log(categoryService);

module.exports=categoryService;