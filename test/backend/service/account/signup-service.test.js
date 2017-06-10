require('../../../init-test-config.js');
const signupService=require('../../../../lib/backend/service/account/signup-service.js');
const domain=require('../../../../lib/backend/domain/domain.js');
const assert=require('assert');


describe('测试注册服务',function(){

    describe('测试 #checkAccountAvailble()',function(){
        // 随机生成一个用户名
        let username="test"+Math.ceil(Math.random()*1000000);
        let email=username+"@snp.virtual-host.email";

        it('用户名应该不存在,账号可用',function(done){
            const accoutAvaible=false;
            signupService.checkAccountAvailble(username,email)
                .then(
                    (name)=>{
                        assert.equal(name,username);
                        done();
                    },
                    (msg)=>{
                        done(msg);
                    }
                );
        });

        it('一旦用户名被注册，再次检查则不可用',function(done){
            let userEnttiy={};    // 用于暂存创建的 user
            domain.user.create({
                username:username,
                email:email,
                password:'password',
                state:'test',
            })
            .then(user=>{
                userEnttiy=user;
                return signupService.checkAccountAvailble(username,email)
                    .then(
                        (info)=>{throw (`这里不该被执行${info}`); },
                        (msg)=>{ assert.ok(msg); return msg; }
                    )
            })
            .then((msg)=>{ 
                userEnttiy.destroy().then(()=>{done()}); 
            })
            .catch(e=>{
                userEnttiy.destroy().then(()=>{ done(e); });
            }) ;
        })

        
    });

    describe('测试 #checkInvitationCodeAvaible()',function(){
        
        it('邀请码不存在，则不可用',function(done){
            let activateCode="test"+Math.ceil(Math.random()*1000000);
            signupService.checkInvitationCodeAvaible(activateCode)
                .then(
                    ()=>{done('激活码不存在时理应reject！');},
                    (msg)=>{
                        assert.ok(msg);
                        done();
                    }
                )
                .catch(e=>{
                    done(e);
                });
        });

        describe("当邀请码被创建",function(){

            function createActivateCodeAndTest(date,ifAvaible,ifNotAvaible){
                return new Promise(function (resolve,reject) {
                    domain.activeCode.create({
                        expiresAt: date,
                    }).then((activateCode) => {
                        return signupService.checkInvitationCodeAvaible(activateCode.code)
                            .then(
                                () => {
                                    activateCode.destroy().then(() => { ifAvaible(); });
                                },
                                (msg) => { 
                                    activateCode.destroy().then(() => { 
                                        ifNotAvaible(msg); 
                                    });
                                }
                            )
                            .catch(e => { throw e; });
                    });
                });
            }

            it('如果expiresAt合适，则可用', function (done) {
                //两天后
                let date=(new Date()).setTime(
                    (new Date()).getTime() + 1000*60*60*24*2  
                );
                createActivateCodeAndTest(date,done,done,done);
            });

            it('如果expiresAt过期，则不可用', function (done) {
                //一天前
                let date=(new Date()).setTime(
                    (new Date()).getTime() - 1000*60*60*24*1  
                );
                createActivateCodeAndTest(
                    date,
                    ()=>{done('理应不可用');},
                    (msg)=>{
                        assert.ok(msg);
                        done();
                    }
                );
            });
        });

    });

    describe('测试 #signup()',function(){

        const username = "test" + Math.ceil(Math.random() * 1000000);
        const email = username + "@snp.virtual-host.email";
        const password = 'hello,world';
        const state = "active";

        it('当activateCode无效，创建失败',function(done){
            let activateCode="a45b9660-7691-11e6-a0ec-89eecebac3b7";
            signupService.signup(username,password,email,activateCode)
                .then(
                    ()=>{done('理应创建失败')},
                    (msg)=>{ 
                        // 用户名是随机产生的，基本上不会重复，但是激活码是不存在的，所以会触发reject动作
                        assert.equal(msg,"激活码不存在或者已经过期"); 
                        done();
                    }
                );
        });


        it('当激活码正确，帐户名有效',function(done){
            //创建激活码
            const createActivateCode=function(){
                return domain.activeCode.create({
                    expiresAt: (new Date()).setTime((new Date()).getTime() + 4 * 60 * 60 * 1000)
                }).then(activateCode => {
                    console.log('激活码创建完毕');
                    return activateCode.code;
                });
            };
            //创建账户
            const createAccount=function(code){
                return signupService.signup(username,password,email,code);
            };

            let resultCache={user:{},code:''};
            createActivateCode()
                .then((code)=>{
                    return createAccount(code);
                })
                .then(
                    (result)=>{
                        resultCache={
                            user:result.userEntity,
                            code:result.code
                        };
                        assert.equal(result.userEntity.username, username);
                        assert.equal(result.userEntity.email, email);
                        return result; 
                    },
                    (e)=>{
                        throw e;
                    }
                )
                .then(result=>{
                    return Promise.all([
                        domain.user.destroy({where:{ id:resultCache.user.id }}),
                        domain.activeCode.destroy({ where: { code: resultCache.code } }),
                    ]).then(()=>{ 
                        done(); 
                    });

                }).catch(e=>{
                    return Promise.all([
                        domain.user.destroy({where:{ id:resultCache.user.id }}),
                        domain.activeCode.destroy({ where: { code: resultCache.code } }),
                    ]).then(() => { 
                        done(e);
                    });
                });

        });
    });
});