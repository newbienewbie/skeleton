const domain=require('../../domain');
const categoryService=require('../category');


/**
 * @param {Integer} id resource id
 * @return {Promise} resource 的JSON对象
 */
function findById(id){
    return domain.resource.findById(id)
        .then(resource=>{
            if(!resource){ return resource; }
            // 创建一个拷贝
            return JSON.parse(JSON.stringify(resource));
        });
}



/**
 * 指定categoryId，找出相应分页的记录。如果categoryId为false，则检索全部。
 * 注意，它会递归查找categoryId的子类
 * @param {Number} categoryId 
 * @param {Number} page 
 * @param {Number} size 
 * @param {Object} condition 条件对象（注意：在condition中设置condition.categoryId是无效的）
 */
function list(categoryId=null,page=1,size=8,condition={}){
    let _categoryId=!!categoryId?categoryId:null;
    return categoryService.getCategorySubnodeIdList(categoryId,{scope:'resource'})
        .then(ids=>{
            ids.push(categoryId);
            condition.categoryId={ $in:ids };
        })
        .then(_=>{
            return domain.resource.findAndCount({
                limit:size,
                offset:(page-1)*size,
                order:[['createdAt','asc']],
                where:condition,
            })
        })
        .then(result=>{
            // todo 将来其他处理
            return result;
        });
}


/**
 * 创建 resource 的服务
 * @param {Object} resource 资源对象模型，
 * @return {Promise} 返回创建的 resource 对象的Promise
 */
function create(resource){
    return domain.resource.create(resource);   // 创建 resource 本体
}

function remove(id){
    return domain.resource.destroy({ where:{id:id} });
}


/**
 * 可以对 name、categoryId、method、path、description 进行修改
 */
function edit(resource){
    let id=resource.id;
    // todo：检查id

    let params={
        name:resource.name,
        categoryId:resource.categoryId,
        method:resource.method,
        path:resource.path,
        description:resource.description,
        status:resource.status,
    };
    return domain.resource.update( params, {where:{id}} );
}



module.exports={
    findById, list,
    create, remove, edit,
};
