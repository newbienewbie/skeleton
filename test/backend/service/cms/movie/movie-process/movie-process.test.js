require('../../../../../init-test-config.js');
const path=require('path');
const fs=require('fs');
const movieProcess=require('../../../../../../backend/service/cms/movie/movie-process.js');
const assert=require('assert');


describe('测试视频处理函数',function(){

    describe('测试探针',function(){
        it('当其输入文件不存在时，应该触发reject',function(){
            this.timeout(50000);
            const p=path.join(__dirname,'a-file-not-exists.avi');
            return movieProcess.getVideoFormat(p)
                .then(
                    function(format){ 
                        assert.fail('不应该执行这里');
                    },
                    function(reason){
                        assert.ok(reason=='文件不存在');
                    }
                );
        });

        it('当输入文件存在，应获取到相应信息', function () {
            this.timeout(50000);
            const p = path.join(__dirname, '1.avi');
            return movieProcess.getVideoFormat(p)
                .then(
                    function (format) {
                        assert.ok(format.duration,"应该有duration属性");
                        return;
                    },
                    function (reason) {
                        assert.fail(reason);
                    }
                );
        });
    });


    describe('测试截图',function(){
        it('当其输入文件不存在,应该触发reject',function(){
            const p = path.join(__dirname, 'a-file-not-exists.avi');
            return movieProcess.getVideoFormat(p)
                .then(
                    function (format) {
                        assert.fail('这里不应该被执行');
                    },
                    function (reason) {
                        assert.ok(reason=="文件不存在", "当文件不存在，reject信息应该是: 文件不存在");
                    }
                );
        });

        it('当条件满足，应该截图成功',function(){
            this.timeout(50000);
            const p=path.join(__dirname,'1.avi');
            return movieProcess.takeScreenShot(p,1,__dirname)
                .then(
                    (outs)=>{
                        console.log(outs);
                        assert.ok(outs);
                        assert.ok(outs.path);
                        assert.ok(outs.filenames);

                        const files=outs.filenames
                            .map(f=>path.join(outs.path,f))
                            .forEach(function(fullpath) {
                                let exists=fs.existsSync(fullpath);
                                assert.ok(exists,`${fullpath} 不存在`);
                            });
                    },
                    ()=>{ return 'error happens';}
                );
        });
    });

});
