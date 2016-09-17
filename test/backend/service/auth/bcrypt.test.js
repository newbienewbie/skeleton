var bcrypt=require('bcryptjs');
var assert=require('assert');

describe('test bcryptjs',()=>{
    it('测试该库的可用性',()=>{
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync("bacon",salt);
        var a=bcrypt.compareSync("bacon", hash); // true
        var b=bcrypt.compareSync("veggies", hash); // false
        assert.ok(a,'bacon hash 失败');
        assert.ok(!b,'bacon, hash失败');
    });
});

