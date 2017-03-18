const domain=require('../../domain/domain');
const keywordService=require('../keyword')("post");


/**
 * @param {Integer} id 文章id
 * @param {Promise} 文章post的JSON对象
 */
function findById(id=1){
    return domain.post.findById(id)
        .then(post=>{
            // 创建一个拷贝
            const p=JSON.parse(JSON.stringify(post));
            // 获取关键词
            return keywordService.findAllByTopicId(post.id)
            .then(keywords=>{ 
                // 设置找到的关键词到之前拷贝的对象上
                p.keywords=keywords.map(i=>{
                    return {
                        id:i.id,
                        tag:i.tag,
                        postId:i.postId,
                    };
                });
                return p;
            })
        });
}

/**
 * todo:把condition转化为where
 */
function list(page=1,size=10,condition={}){
    return domain.post.findAndCount({
        offset:(page-1)*size,
        limit:size,
    });
}

function recent(categoryId=null,page=1,size=8){
    return domain.post.findAndCount({
        limit:size,
        offset:(page-1)*size,
        order:[['createdAt','desc']],
        where:{
            // status:'approval',
        },
        include:[
            {
                model:domain.category,
            },
            {
                model:domain.user,
                as:'author'
            },
        ],
    })
    .then(result=>{
        const total=result.count;
        const list=result.rows;
        // 避免原型链上的属性影响
        let _list=JSON.parse(JSON.stringify(list));
        _list=_list.map(i=>{
            delete i.author.password;
            delete i.author.roles;
            delete i.author.createdAt;
            delete i.author.updatedAt;
            return i;
        });
        return {rows:_list,count:total};
    });
}


/**
 * 创建文章的服务
 * @param {Object} post 文章对象模型，
 * @param {Array} post.keywords
 * @return {Promise} 返回创建的文章对象的Promise
 */
function create(post){
    // 如果没有摘要，则自动提取前正文的前200个字符
    if(!post.excerpt){
        post.excerpt=post.content.slice(0,200);
    }
    return domain.post.create(post)    // 创建 post
        // 创建附属信息
        .then(p=>{       
            return keywordService.create(p.id,post.keywords)
                // 返回创建的文章对象
                .then(_=>p);
        });
}

function remove(id){
    return domain.post.findById(id)
        .then((post)=>{
            return post.destory();
        });
}


/**
 * 可以对 title、content、slug、password、categoryId,keywords进行修改
 * 如果传递的keywords和数据库中的不同，则对数据库中没有的，予以添加；
 */
function edit(post){
    let id=post.id;
    // todo：检查id

    let params={
        title:post.title,
        content:post.content,
        slug:post.slug,
        password:post.password,
        categoryId:post.categoryId
    };
    // 设置 postId
    let _keywords=post.keywords.map(i=>{
        i.postId=id;
        return i;
    });
    return domain.post.findById(id)
        .then(p=>{
            // 更新 Post 本身
            const promiseUpdatePost=domain.post.update(params,{where:{id:p.id,}});
            // 更新 Keywords 部分
            const promiseKeywords=keywordService.edit(id,_keywords);
            return Promise.all([promiseKeywords,promiseUpdatePost]);
        });
}


/**
 * 更改文章状态为发表状态
 */
function publish(id){
    return domain.post.update( {status:'publish'} , {where:{ id,status:'draft' }} );
}

/**
 * 更改文章状态-通过（至下一节点)
 */
function approval(id){
    return domain.post.update({status:'approval'},{where:{id,status:'publish'}});
}

/**
 * 更改文章状态-退回（至上一节点以修改）
 */
function sendback(id){
    return domain.post.update({status:'draft'},{where:{id,status:'publish'}});
}

/**
 * 更改文章状态-拒绝（至最终节点）
 */
function reject(id){
    return domain.post.update({status:'reject'},{where:{id,status:'publish'}});
}


module.exports={
    findById, list,recent,
    create, remove, edit,
    publish,sendback,reject,approval
};
