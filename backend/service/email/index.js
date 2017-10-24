const config=require("../../config").getConfig();
const domain=require('../../domain');
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




/**
 * 发送邮件来激活账户
 */
function sendEmailToActive(user) {


    let today=new Date();
    const x=domain.activeCode.create({
        expiresAt:(new Date()).setDate(today.getDate()+2),
    }).then(ac=>{
        user.setActiveCode(ac);
        let url=`${config.site.url}/account/activate?u=${user.id}&c=${ac.code}`;
        let mail={
            from:config.email.username,
            to:user.email,
            subject:`${config.site.name}-邮件`,
            text:`亲爱的${user.username}:\r\n您在${config.site.name}注册了账号，为此我们给您发送了这封验证邮件，请访问这里\t${url}\t来激活您的账号。\r\n如果您对此并不知情，请您忽略此邮件，给您造成不便，请谅解。`,
            // html:`亲爱的${user.username}:<br>您在${config.site.name}注册了账号，为此我们给您发送了这封验证邮件，请访问<a href='${url}'>这里</a>来激活您的账号。<br>如果您对此并不知情，请您忽略此邮件，给您造成不便，请谅解。`,
        };
        return mail;
    }).then(mail=>{
        return emailService.sendMail(mail)
    }).then(info=>console.log("邮件发送成功"))
    .catch(e=>{
        console.log('邮件发送失败',e);
    });
}



module.exports={
    sender:config.email.username,
    sendMail,
    sendEmailToActive,
    transport,
};