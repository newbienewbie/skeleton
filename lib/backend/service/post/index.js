const domain=require('../../domain/domain');


function findById(id=1){
    return domain.post.findById(id);
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


function create(post){
    // 如果没有摘要，则自动提取前正文的前200个字符
    if(!post.excerpt){
        post.excerpt=post.content.slice(0,200);
    }
    return domain.post.create(post);
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
    return domain.post.update(params,{where:{ id, }} );
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
