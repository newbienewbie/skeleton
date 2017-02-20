const domain=require('../../domain/domain');


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
            return post.getKeywords()
            // 设置关键词到拷贝的对象上
            .then(keywords=>{
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
    return domain.post.findAll({
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
    .then(list=>{
        // 避免原型链上的属性影响
        let _list=JSON.parse(JSON.stringify(list));
        return _list.map(i=>{
            delete i.author.password;
            delete i.author.roles;
            delete i.author.createdAt;
            delete i.author.updatedAt;
            return i;
        })
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
            const promiseKeywords=post.keywords
                // 逐一设置 postId
                .map(i=>{
                    i.postId=p.id;
                    i.id=null; // 清空自带的keyword.id
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
    return domain.post.findById(id)
        .then((post)=>{
            return post.destory();
        });
}


/**
 * 可以对 title、content、slug、password、categoryId进行修改
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
    return domain.post
        // 更新
        .update(params,{where:{ id, }} )
        // 更新关键词
        .then(p=>{
            return p.getKeywords()
                .then(keywords=>{

                    // 待增加的关键词
                    const toAdd=_keywords.filter(i=>{
                        // 如果 i.tag 和 keywords 中的每一个 的tag 都不匹配，则需要增加
                        for(let idx=0;idx<keywords.length;idx++){ 
                            if(keywords[idx].tag == i.tag){return false;} 
                        }
                        return true;
                    }).map(i=>domain.keyword.create(i));

                    // 待删除的关键词
                    const toDelete=keywords.filter(i=>{
                        // 如果 i.tag 和 _keyword 中的每一个的tag都不匹配，都需要删除
                        for(let idx=0;idx<_keywords.length;idx++){
                            if(_keywords[idx].tag == i.tag){ return false;}
                            return true;
                        }
                    }).then(i=>i.destroy());

                    return Promise.all([
                        Promise.all(toAdd),
                        Promise.all(toDelete),
                    ])
                    // 最终仍然返回编辑后的post对象
                    .then(_=>p);
                });
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
