require('../../init-test-config');
const assert=require('assert');
const domain=require('../../../lib/backend/domain/domain.js');



describe('domain',()=>{
    //下面这行不可以采用()=>{}这种形式的匿名函数
    describe('authentication',function(){
        this.timeout(1000);
        it('authentication',function(done){
            domain.sequelize.authenticate()
                .then(
                    ()=>{ console.log('authenticate passed'); },
                    ()=>{ return 'auth failed';}
                ).then(done)
                .catch(done);
        });
    });
});
