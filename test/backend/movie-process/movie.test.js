const path=require('path');
const assert=require('assert');
const getMovieFormat=require('../../../lib/backend/movie-process/get-video-format.js');



describe('测试利用视频探针获取视频格式信息',function(){
    it('测试 1.avi ',function(done){
        const p=path.join(__dirname,'1.avi');
        getMovieFormat(p)
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
