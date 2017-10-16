require('../../../init-test-config.js');
const domain=require('../../../../backend/domain');
const roleService=require('../../../../backend/service/account/role-service');
const assert=require('assert');


describe('测试role-service',function(){

    const name='role_test-name';
    const description='描述';

    it('#createRole() #findById() #remove',function(){
        return roleService.createRole({name,description})
            .then(role=>{
                return roleService.findById(role.id);
            })
            .then(role=>{
                assert.equal(role.name,name);
                assert.equal(role.description,description);
                return role.id;
            })
            .then(id=>{
                return roleService.remove(id)
                    .then(_=>{
                        return roleService.findById(id);
                    });
            })
            .then(role=>{
                assert.ok(!role);
            });
    });

    it('#addRoleForUser() #listRolesOfUser() #removeRolesForUser',function(){
        return domain.user.create({username:'x7',password:'x7',email:'x7',state:'a'})
            .then(user=>{
                const _ = 111;
                return domain.role.create({ name: `r${_}`, description: `d${_}` })
                    .then(function (role) {
                        return user.addRoles([role])
                            .then(_=>{
                                return roleService.listRolesOfUser(user.id)
                                    .then(roles=>roles.map(r=>r.id))
                                    .then(roles=>{
                                        assert.ok(roles.some(r=>r==role.id));
                                    });
                            })
                            .then(_=>{
                                return roleService.removeRolesForUser(user.id,[role]);
                            })
                            .then(_=>{
                                return roleService.remove(role.id);
                            })
                            .then(_=>{
                                return user.destroy();
                            });
                    })
            });
    });
});