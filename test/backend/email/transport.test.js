var assert=require('assert');
var transport=require('../../../lib/backend/email/transport.js');

describe('测试transport',function () {
    this.timeout(10000);
    it("确认配置",function (done) {
        try{
            transport.verify(function (error,success) {
                assert.ok(!error);
                assert.ok(success);
                done();
            });
        }catch(err){
            done(err);
        }
    });
    
});