const register=require('./router');
const service=require('./service');
const domain=require('./domain');


//导出app，用于http.createServer(app)
module.exports={
    register,
    service,
    domain,
};