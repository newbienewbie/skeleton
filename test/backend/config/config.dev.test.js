var assert=require('assert');
var path=require('path');
const config=require('../../../lib/backend/config/config.dev.js');


describe('development config',()=>{
    describe('env',()=>{
        it('should equal dev',()=>{
            assert.equal(config.env,'dev');
        });
    });
    describe('database config',()=>{
        it('dialect defaults to mysql',()=>{
           assert.equal(config.database.dialect,'mysql');
        });
        it('host defaults to localhost', () => {
            assert.equal(config.database.host, '127.0.0.1');
        });
        it('port defaults to 3306',()=>{
           assert.equal(config.database.port,3306);
        });
    });
    
});