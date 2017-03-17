const assert=require('assert');
const keywordService=require('../../../../lib/backend/service/keyword');

describe("测试 keyword-ervice",function(){

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
                keywords=[
                    {tag:'测试tag3'},
                    {tag:'测试tag4'},
                ];
                const topicId=null;
                const all=kws.map((kw,idx)=>{
                    topicId=kw.topicId;
                    return keywordService.edit(kw.topicId,keywords);
                });
                // 找到刚刚编辑的所有关键词
                return Promise.all(all)
                    .then(x=>{
                        return keywordService.findAllByTopicId(topicId)
                    })
                    .then(kws=>{
                        const tags=kws.map((kw,i)=>{
                            return kw.tag;
                        });
                        keywords.forEach(tag=>{
                            assert.ok(tags.indexOf(tag)!=-1,`${tag}未找到`);
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
