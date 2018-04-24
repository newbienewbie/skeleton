var assert=require('assert');
var path=require('path');
const config=require('../../config/config.dev.js');


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
            let host=config.database.host;
            assert.ok(host =='127.0.0.1' || host =='localhost' );
        });
        it('port defaults to 3306',()=>{
           assert.equal(config.database.port,3306);
        });
    });
    
});