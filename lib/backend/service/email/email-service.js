const config=require('../../config/config.js');
const transport=require('./transport.js');
 
/**
 * 发送邮件的函数,返回一个Promise对象
 * mail={
 *     from:,
 *     to:,
 *     subject:,
 *     text:,
 *     html:,
 * }
 */
function sendMail(mail) {
    return new Promise((resolve,reject)=>{
        // send mail with defined transport object 
        transport.sendMail(mail, function(error, info){
            if(error){
                reject(error);
            }else{
                resolve(info);
            }
        });
    });
}



module.exports={
    sender:config.email.username,
    sendMail:sendMail,
};