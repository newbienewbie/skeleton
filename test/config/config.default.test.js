var assert=require('assert');
var path=require('path');
const config=require('../../config/config.default');



describe('默认配置',()=>{

    describe('环境配置',()=>{
        it('默认为"prod"',()=>{
            assert.equal(config.env,'prod');
        });
    });

    describe('数据库配置',()=>{
        it('dialect 默认为 mysql',()=>{
           assert.equal(config.database.dialect,'mysql');
        });
        it('host 默认为 localhost', () => {
            assert.equal(config.database.host, 'localhost');
        });
        it('port 默认为 3306',()=>{
           assert.equal(config.database.port,3306);
        });
    });
    
});