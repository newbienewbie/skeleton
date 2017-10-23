require('../../../init-test-config.js');
const assert=require('assert');
const keywordService=require('../../../../backend/service/common/keyword');

describe("测试 keyword-service",function(){

    describe("#filter()后逐一测试 ",function(){
        ["post","ebook","movie"].forEach(i=>{
            it("{create} {edit} {remove}",function(){
                const service=keywordService(i);
                const keywords=[
                    {tag:'测试tag1'},
                    {tag:'测试tag2'},
                ];
                return service.create(1,keywords)
                    .then(kws=>{
                        kws.forEach((e,i)=>{
                            assert.equal(e.tag,keywords[i].tag);
                        })
                        return kws;
                    })
                    // edit
                    .then(kws=>{
                        let topicId=null;
                        kws.map((kw,idx)=>{
                            topicId=kw.topicId;
                        });
                        const keywords=[
                            {tag:'测试tag3'},
                            {tag:'测试tag4'},
                        ];
                        return service.edit(topicId,keywords)
                            .then(x=>{
                                return service.findAllByTopicId(topicId)
                            })
                            .then(kws=>{
                                const tags=kws.map((kw,i)=>{
                                    return kw.tag;
                                });
                                keywords.forEach(k=>{
                                    assert.ok(tags.indexOf(k.tag)!=-1,`${keywords.toString()} -${k.toString()}未找到`);
                                })
                                return kws;
                            });
                    })
                    // 删除
                    .then(kws=>{
                        const all=kws.map((kw,idx)=>{
                            return service.removeById(kw.id);
                        });
                        return Promise.all(all);
                    });
            });
        })
    });

});
