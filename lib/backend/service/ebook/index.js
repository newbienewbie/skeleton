const domain=require('../../domain/domain');


/**
 * @param {Integer} id book id
 * @param {Promise} book 的JSON对象
 */
function findById(id){
    return domain.ebook.findById(id)
        .then(book=>{
            // todo 将来其他处理
            return book;
        });
}

/**
 * todo:把condition转化为where
 */
function list(page=1,size=10,condition={}){
    return domain.ebook.findAndCount({
        offset:(page-1)*size,
        limit:size,
    });
}

function recent(categoryId=null,page=1,size=8){
    return domain.ebook.findAndCount({
        limit:size,
        offset:(page-1)*size,
        order:[['createdAt','desc']],
        where:{ },
    })
    .then(result=>{
        // todo 将来其他处理
        return result;
    });
}


/**
 * 创建 book 的服务
 * @param {Object} book 文章对象模型，
 * @return {Promise} 返回创建的 book 对象的Promise
 */
function create(ebook){
    return domain.ebook.create(ebook)    // 创建 book 本体
        // 创建附属信息
        .then(e=>{       
            const promiseKeywords=ebook.keywords
                // 逐一设置 postId
                .map(i=>{
                    i.id=null; // 清空自带的keyword.id
                    i.ebookId=e.id;  // 设置
                    return i;
                })
                // 用于创建附属的关键词记录的Promise
                .map(i=>{
                    return domain.keyword.create(i);
                });
            return Promise.all(promiseKeywords)
                // 返回创建的文章对象
                .then(_=>p);
        });
}

function remove(id){
    return domain.ebook.findById(id)
        .then((book)=>{
            return book.destory();
        });
}


/**
 * 可以对 title等进行修改
 * 如果传递的keywords和数据库中的不同，则对数据库中没有的，予以添加；
 */
function edit(book){
    let id=book.id;
    // todo：检查id

    let params={
        title:book.title,
        isbn:book.isbn,
        author:book.author,
        description:book.description,
        posterUrl:book.posterUrl,
        url:book.url,
        note:book.note,
    };
    return domain.ebook.findById(id)
        .then(p=>{
            return domain.ebook.update(params,{where:{id:p.id,}});
        });
}


/**
 * 更改书籍状态为发表状态
 */
function publish(id){
    return domain.ebook.update( {status:'publish'} , {where:{ id,status:'draft' }} );
}

/**
 * 更改书籍状态-通过（至下一节点)
 */
function approval(id){
    return domain.ebook.update({status:'approval'},{where:{id,status:'publish'}});
}

/**
 * 更改书籍状态-退回（至上一节点以修改）
 */
function sendback(id){
    return domain.ebook.update({status:'draft'},{where:{id,status:'publish'}});
}

/**
 * 更改书籍状态-拒绝（至最终节点）
 */
function reject(id){
    return domain.ebook.update({status:'reject'},{where:{id,status:'publish'}});
}


module.exports={
    findById, list,recent,
    create, remove, edit,
    publish,sendback,reject,approval
};
