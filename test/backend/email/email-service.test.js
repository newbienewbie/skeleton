var assert=require('assert');
var mailService=require("../../../lib/backend/email/email-service");

var mail = {
    from: mailService.sender, // sender address 
    to:'330985700@qq.com' , // list of receivers 
    subject: 'Hello ✔', // Subject line 
    text: 'Hello world 🐴', // plaintext body 
    html: '<b>Hello world 🐴</b>' // html body 
};

describe('test email service',function () {
    describe('test send email',function () {
        this.timeout(20000);
        it('send to qq.com',function (done) {
            mailService.sendMail(mail).then(
                info=>{
                    console.log(info.response);
                    assert.ok(info);
                }
            )
            .then(done)
            .catch(done);
        });
    });
});