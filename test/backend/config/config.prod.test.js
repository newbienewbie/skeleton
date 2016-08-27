const assert=require('assert');
const path=require('path');
const config=require('../../../lib/backend/config/config.prod.js');


describe('生产环境配置文件的测试',()=>{
    describe('env',()=>{
        it('should equal prod',()=>{
            assert.equal(config.env,'prod');
        });
    });
});