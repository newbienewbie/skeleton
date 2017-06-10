var assert=require('assert');
var path=require('path');
const config=require('../../config');



describe('配置',()=>{

    describe('数据库配置',()=>{
        it('应该不为空',()=>{
            if(!config.database){
                assert.fail("数据库配置为空");
            }
        });
    });
    
});