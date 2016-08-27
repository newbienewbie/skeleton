const assert=require('assert');
const check=require('../../../lib/backend/auth/check.js');



describe('auth check',()=>{
    var req={
        session:{
            username:'',
            roles:[]
        }
    };
    var res={
        send:()=>{

        }
    };
    var next=()=>{};
    describe('check login',()=>{
        var checkLogin= check.checkLogin();
        it('username={undefined} 时资源不可访问(跳过next()方法)',()=>{
            req.session.username=undefined;
            let exeuted=false;
            checkLogin(req,res,()=>{
                console.log('这里的代码不会被执行');
                exeuted=true;
                assert.fail("fail");
            });
            assert.ok(!exeuted,'username为defined，next()方法不应该被执行');
        });
        it('username={null} 时资源不可访问(跳过next()方法)',()=>{
            req.session.username=null;
            let exeuted=false;
            checkLogin(req,res,()=>{
                console.log('这里的代码不会被执行');
                exeuted=true;
                assert.fail("fail");
            });
            assert.ok(!exeuted,'username为null,next()方法不应该被执行');
        });
        it('username={空串} 时资源不可访问(跳过next()方法)',()=>{
            req.session.username="";
            let exeuted=false;
            checkLogin(req,res,()=>{
                console.log('这里的代码不会被执行');
                exeuted=true;
                assert.fail("fail");
            });
            assert.ok(!exeuted,"username为空字符串，next()方法不应该被执行");
        });
        it('username={普通字符串} 时资源可以访问(执行next()方法)',()=>{
            req.session.username="hello";
            let exeuted=false;
            checkLogin(req,res,()=>{
                exeuted=true;
            });
            //期待executed为true
            assert.ok(exeuted,'普通字符串的用户名，理应执行next()');
        });
        
    });
    
    describe('check role',()=>{
        it('requiring role of `ROLE_1`，having `ROLE_X`',()=>{
            req.session.roles=['ROLE_X'];
            var checkRole=check.checkRole('ROLE_1');
            let exeuted=false; 
            checkRole(req,res,()=>{
                assert.fail('没有要求的角色，就不该执行');
                exeuted=true;
            });
            //期待executed为false
            assert.ok(!exeuted,"没有要求的角色，但next()被执行了");
        });
        it('requiring role of `ROLE_1`，having `ROLE_1`',()=>{
            req.session.roles=['ROLE_12','ROLE_2','ROLE_1'];
            var checkRole=check.checkRole('ROLE_1');
            let exeuted=false; 
            checkRole(req,res,()=>{
                exeuted=true;
                assert.ok(exeuted);
            });
            //期待executed为true
            assert.ok(exeuted,"拥有指定角色，next()理应被执行");
        });
    });
    

    describe('check any role',()=>{
        it('requiring any role of [ROLE_X,ROLE_Y]，having `ROLE_1,ROLE_2,ROLE_3`',()=>{
            req.session.roles=['ROLE_1','ROLE_2','ROLE_3'];
            let checkRole=check.checkAnyRole(['ROLE_X','ROLE_Y']);
            let exeuted=false; 
            checkRole(req,res,()=>{
                assert.fail('没有要求的角色，就不该执行');
                exeuted=true;
            });
            //期待executed为false
            assert.ok(!exeuted,"没有要求的角色，但next()被执行了");
        });
        it('requiring any role of [ROLE_X,ROLE_Y]，having `ROLE_1,ROLE_2,ROLE_X`',()=>{
            req.session.roles=['ROLE_1','ROLE_2','ROLE_X'];
            let checkRole=check.checkAnyRole(['ROLE_X','ROLE_Y']);
            let exeuted=false; 
            checkRole(req,res,()=>{
                exeuted=true;
                assert.ok(exeuted);
            });
            //期待executed为true
            assert.ok(exeuted,"拥有指定角色，next()理应被执行");
        });
        
        

    });



    describe('check all role',()=>{
        it('requiring all roles of [ROLE_X,ROLE_Y]，having `ROLE_1,ROLE_2,ROLE_3,ROLE_X`',()=>{
            req.session.roles=['ROLE_1','ROLE_2','ROLE_3','ROLE_X'];
            let checkRole=check.checkAllRoles(['ROLE_X','ROLE_Y']);
            let exeuted=false; 
            checkRole(req,res,()=>{
                assert.fail('没有要求的全部角色，就不该执行');
                exeuted=true;
            });
            //期待executed为false
            assert.ok(!exeuted,"没有要求的角色，但next()被执行了");
        });
        it('requiring any role of [ROLE_X,ROLE_Y]，having `ROLE_1,ROLE_Y,ROLE_X`',()=>{
            req.session.roles=['ROLE_1','ROLE_Y','ROLE_X'];
            let checkRole=check.checkAllRoles(['ROLE_X','ROLE_Y']);
            let exeuted=false; 
            checkRole(req,res,()=>{
                exeuted=true;
                assert.ok(exeuted);
            });
            //期待executed为true
            assert.ok(exeuted,"拥有指定的全部角色，next()理应被执行");
        });
        
        

    });


});