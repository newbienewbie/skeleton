const domain=require('../../../domain');
const keywordService=require('../../keyword')("ebook");
const categoryService=require('../../common/category');
const {Service,message}=require('tiny-service');

const ebookService=Service(domain.ebook);

const _findById=ebookService.findById;
/**
 * @param {Integer} id book id
 * @return {Promise} book 的JSON对象
 */
ebookService.findById=function findById(id){
    return _findById(id)
        .then(ebook=>{
            if(!ebook){
                return ebook;
            }
            // 创建一个拷贝
            const e=JSON.parse(JSON.stringify(ebook));
            // 获取关键词
            if(!!e){
                return keywordService.findAllByTopicId(id)
                    .then(keywords=>{
                        return e.keywords=keywords.map(i=>{
                            return { id:i.id, tag:i.tag, topicId:i.topicId};
                        });
                    })
                    // 最终返回e
                    .then(_=>e);
            }else{
                return e;
            }
        });
}


/**
 * 指定categoryId，逆序找出相应分页的记录。如果categoryId为false，则检索全部
 * 注意，此函数和list有较大的不同，它会递归查找categoryId的子类
 * @param {Number} categoryId 
 * @param {Number} page 
 * @param {Number} size 
 */
ebookService.recent=function recent(categoryId=null,page=1,size=8){
    const condition={};
    let _categoryId=!!categoryId?categoryId:null;
    return categoryService.getCategorySubnodeIdList(categoryId,{scope:'ebook'})
        .then(ids=>{
            ids.push(categoryId);
            condition.categoryId={ $in:ids };
        })
        .then(_=>{
            return domain.ebook.findAndCount({
                limit:size,
                offset:(page-1)*size,
                order:[['createdAt','desc']],
                where:condition,
            })
        })
        .then(result=>{
            // todo 将来其他处理
            return result;
        });
}


/**
 * 创建 book 的服务
 * @param {Object} book 文章对象模型，
 * @return {Promise} 返回创建的 ebook 对象的Promise
 */
ebookService.create=function create(ebook){
    return domain.ebook.create(ebook)    // 创建 book 本体
        // 创建附属信息
        .then(e=>{       
            const promiseKeywords=ebook.keywords
                // 逐一设置 topicId
                .map(i=>{
                    i.id=null; // 清空自带的keyword.id
                    i.topicId=e.id;  // 设置
                    return i;
                })
                // 用于创建附属的关键词记录的Promise
                .map(i=>{
                    return domain.keyword.create(i);
                });
            return Promise.all(promiseKeywords)
                // 返回创建的文章对象
                .then(_=>{
                    let eb=e.toJSON();
                    eb.keywords=_.map(i=>i.toJSON());
                    return eb;
                });
        });
}



/**
 * 可以对 title等进行修改
 * 如果传递的keywords和数据库中的不同，则对数据库中没有的，予以添加；
 */
const _update=ebookService.update;
ebookService.update= function edit(id,book){
   
    let params={
        title:book.title,
        isbn:book.isbn,
        author:book.author,
        description:book.description,
        posterUrl:book.posterUrl,
        url:book.url,
        note:book.note,
    };
    return _update(id, params )
        .then(_=>{    // 更新附属的关键词
            return keywordService.edit(id,book.keywords);
        });
}


/**
 * 更改书籍状态为发表状态
 */
ebookService.publish=function publish(id){
    return domain.ebook.update( {status:'publish'} , {where:{ id,status:'draft' }} );
}

/**
 * 更改书籍状态-通过（至下一节点)
 */
ebookService.approval=function approval(id){
    return domain.ebook.update({status:'approval'},{where:{id,status:'publish'}});
}

/**
 * 更改书籍状态-退回（至上一节点以修改）
 */
ebookService.sendback=function sendback(id){
    return domain.ebook.update({status:'draft'},{where:{id,status:'publish'}});
}

/**
 * 更改书籍状态-拒绝（至最终节点）
 */
ebookService.reject=function reject(id){
    return domain.ebook.update({status:'reject'},{where:{id,status:'publish'}});
}


module.exports=ebookService;
