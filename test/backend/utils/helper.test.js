const helper=require('../../../backend/utils/helper');
const assert=require('assert');



describe('test helper.js',function(){
    it('test toPositiveInteger()',function(){
        const tests=[
            {param:'-1',expect:1},
            {param:'0',expect:1},
            {param:"0.3",expect:1},
            {param:"1.3",expect:1},
            {param:"2.3",expect:2},
            {param:"2.3.3",expect:2},
            {param:"",expect:1},
        ];
        tests.forEach(item=>{
            const result=helper.toPositiveInteger(item.param);
            assert.equal(result,item.expect,` provide: ${item.param} expect: ${item.expect}`);
        });
    });
});