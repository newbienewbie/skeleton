const assert=require('assert');
const keywordService=require('../../../../lib/backend/service/keyword');

describe("测试 keyword-service",function(){

    it("{create} {edit} {remove}",function(){
        keywords=[
            {tag:'测试tag1'},
            {tag:'测试tag2'},
        ];
        return keywordService.create(1,keywords)
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
                keywords=[
                    {tag:'测试tag3'},
                    {tag:'测试tag4'},
                ];
                return keywordService.edit(topicId,keywords)
                    .then(x=>{
                        return keywordService.findAllByTopicId(topicId)
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
                    return keywordService.removeById(kw.id);
                });
                return Promise.all(all);
            });
    });
});
