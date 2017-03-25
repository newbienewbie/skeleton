const domain=require('../../domain/domain');

class Service{

    constructor(filter="post"){
        this.filter=filter;
    }

    /**
    * 查找指定topicId的所有的keyword
    * @param {Number} topicId 
    * @return {Promise}
    */
    findAllByTopicId(topicId){
        return domain.keyword.findAll({
            where:{
                scope:this.filter,
                topicId,
            }
        });
    }


    /**
    * 批量创建指定topicId的众多关键词 
    * @param {Number} topicId postId、ebookId、movieId，etc.
    * @param {Array} keywords 关键词数组
    * @return {Promise} 返回批量创建关键词的Promise
    */
    create(topicId,keywords){
        const promiseKeywords=keywords
            .map(i=>{
                i.id=null;                       // 先清空keyword自带的id，因为创建时会自动生成
                i.topicId=topicId;               // 设置 topicId
                i.scope=this.filter;            // 设置 关键词所属的领域
                return domain.keyword.create(i); // 创建 keyword
            });
        return Promise.all(promiseKeywords);
    }

    /**
    * 批量修改指定topicId的众多关键词 
    * @param {Number} topicId postId、ebookId、movieId，etc.
    * @param {Array} keywords 关键词数组
    * @return {Promise} 返回批量修改关键词的Promise
    */
    edit(topicId,keywords){
        return domain.keyword.findAll({
            where:{
                scope:this.filter,
                topicId:topicId,
            }
        }).then(kw=>{
            // 待增加的关键词
            const toAdd=keywords.filter(i=>{
                // 如果 i.tag 和 kw 中的每一个 的tag 都不匹配，则需要增加
                for(let idx=0;idx<kw.length;idx++){ 
                    if(kw[idx].tag == i.tag){return false;} 
                }
                return true;
            }).map(i=>{
                i.id=null;
                i.topicId=topicId;
                i.scope=this.filter;
                return domain.keyword.create(i)
            });
    
            // 待删除的关键词
            const toDelete=kw.filter(i=>{
                // 如果 i.tag 和 客户端传递来的keywords 中的任一个的tag 可以匹配，就不需要删除
                for(let idx=0;idx<keywords.length;idx++){
                    if(keywords[idx].tag == i.tag){ return false; }
                }
                console.log(`待删除`,i.tag);
                return true;
            }).map(i=>i.destroy());
    
            return Promise.all([ Promise.all(toAdd), Promise.all(toDelete), ]); 
        });
    }

    /**
     * @param {Number} id
     * @return {Promise}
     */
    removeById(id){
        return domain.keyword.destroy({
            where:{ 
                id:id,
                scope:this.filter
            }
        });
    }
    
    /**
     * @topicId {Number} topicId
     * @return {Promise}
     */
    removeAllByTopicId(topicId){
        return domain.keyword.destroy({
            where:{ 
                topicId:topicId ,
                scope:this.filter
            }
        });
    }


}



module.exports={ Service };