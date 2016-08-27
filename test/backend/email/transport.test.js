var assert=require('assert');
var transport=require('../../../lib/backend/email/transport.js');

describe('测试transport',function () {
    this.timeout(10000);
    it("确认配置",function (done) {
        transport.verify(function (error,success) {
            if (error) {
                console.log(error);
                assert.fail(error);
                done();
            } else {
                assert(success,"smtp理应准备好接收消息");
                done();
            }
        });
    });
    
});