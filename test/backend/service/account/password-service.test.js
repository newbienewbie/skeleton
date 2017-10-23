require('../../../init-test-config.js');
const assert = require('assert');
const passwordService = require('../../../../backend/service/account/password-service.js');
const bcrypt = require('bcryptjs');



let comparePasword=passwordService.compare;
let generatePassword=passwordService.generate;

describe("测试password-service", function () {

    describe("测试password-compare", function () {
    
        it("bacon 应该和他的bcrypt hash 匹配", (done) => {
            var salt = bcrypt.genSaltSync(8);
            var hash = bcrypt.hashSync("bacon", salt);
            console.log(salt, "\t", hash);
            comparePasword('bacon', hash, () => {
            }).then((res) => {
                assert.ok(res, "bacon和他的hash应该相同");
            })
            .then(done)
            .catch(done);
        });

        it("bacon 应该和他的bcrypt hashString 匹配", (done) => {
            var hash = "$2a$10$lOxak2rBzCO68pHCFhXHuunXVtWsAwcfOjdW6qYveSUrLYY35eR2y";
            comparePasword('bacon', hash).then((res) => {
                assert.ok(res, "bacon和他的hash应该相同");
            })
            .then(done)
            .catch(done);
        });

        it('foo 应该和bacon的hash不匹配', (done) => {
            var hash = bcrypt.hashSync("bacon");
            comparePasword('foo', hash).then((res) => {
                assert.ok(!res, "foo和bacon的hash应该不匹配");
            })
            .then(done)
            .catch(done);
        });

    });


    describe("测试password-generate", function () {
        it("bacon 配合10 rounds salt,和原值compare",function () {
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync("bacon", salt);
            var result=bcrypt.compareSync("bacon",hash);
            assert.ok(result,"bacon 和 其hash理应相等");
        });
        
        it("bacon 配合8 rounds salt，和原值compare",function () {
            var salt = bcrypt.genSaltSync(8);
            var hash = bcrypt.hashSync("bacon", salt);
            var result=bcrypt.compareSync("bacon",hash);
            assert.ok(result,"bacon 和 其hash理应相等");
        });
        
        it("bacon 配合8 rounds salt，和其他值compare",function () {
            var salt = bcrypt.genSaltSync(8);
            var hash = bcrypt.hashSync("bacon", salt);
            var result=bcrypt.compareSync("bacom",hash);
            assert.ok(!result,"bacon的hash和其他值比较理应不匹配");
        });
    });
});