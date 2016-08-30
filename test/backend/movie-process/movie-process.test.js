const path=require('path');
const assert=require('assert');
const getVideoFormat=require('../../../lib/backend/movie-process/movie-process.js').getVideoFormat;



describe('测试利用视频探针获取视频格式信息',function(){
    it('测试 1.avi ',function(done){
        const p=path.join(__dirname,'1.avi');
        getVideoFormat(p)
            .then(
                function(format){ 
                    done();
                 },
                function(err){
                    assert.fail(err);
                    done();
                }
            )
            .catch((e)=>{
                assert.fail(e);
                done();
            });
        
    });

});
