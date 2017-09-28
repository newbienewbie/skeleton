//目前的实现依赖于session
const domain=require('../../domain');


/**
 * 创建角色
 */
function createRole(name,description){
    return domain.role.create({
        name,
        description,
    });
}



function findById(roleId){
    return domain.role.findById(roleId);
}

/**
 * find one role by role name
 * @param {String} rolename 
 */
function findByName(rolename){
    return domain.role.findOne({
        where:{
            name:rolename,
        }
    });
}


function remove(roleId){
    return domain.role.destroy({where:{id:roleId}});
}


/**
 * 更新角色本身信息
 * @param {Number} roleId 
 * @param {Object} newRole 
 */
function update(roleId,newRole){
    delete newRole.id;
    return domain.role.update(newRole,{
        where:{ id:roleId, }
    });
}

/**
 * 列出所有的角色集合
 */
function list(page=1,size=10,condition={}){
    return domain.role.findAll({
        where:condition,
        offset:(page-1)*size,
        limit:size,
    });
}


/**
 * 从数据库中加载指定账户的角色信息到SESSION,
 *     成功则resolve({username,roles})
 *     失败则reject(reason)
 */
function load(username,req){
    return domain.user.find({
            where: { username: username }
        })
        .then( (user)=>{
            if (user) {
                req.session.userid=user.id;
                req.session.username = user.username;
                return user.getRoles()
                    .then(roles=>{
                        req.session.roles =roles.map(r=>r.toJSON());
                        return Promise.resolve({ username:user.username, roles, });
                    });
            } else {
                return Promise.reject(`the user with ${username} not found`);
            }
        });
}


/**
 * 为某个用户添加已经存在的角色
 * @param {Integer} userId 
 * @param {Integer} roleId
 */
function addRolesForUser(userId,roles){
    return domain.user.findById(userId)
        .then(user=>{
            if(user){return user.addRoles(roles);}
            else{throw new Error(`user not found :${userId}`)}
        });
}


/**
 * 为用户移除角色，注意不会删除角色，只是移除用户-角色关系
 * @param {Number} userId 
 * @param {Number} roles 
 */
function removeRolesForUser(userId,roles){
    return domain.user.findById(userId)
        .then(user=>{
            if(user){return user.removeRoles(roles);}
            else{throw new Error(`user not found :${userId}`)}
        });
}


/**
 * 获取某个用户的当前角色列表
 * @param {Number} userId 
 * @param {Number} page 
 * @param {Number} size 
 * @param {Object} condition 
 */
function listRolesOfUser(userId,page=1,size=8,condition={}){

    return domain.role.findAll({
        where:condition,
        offset:(page-1)*size,
        limit:size,
        include:[
            {
                model:domain.user,
                through:{
                    where:{ 
                        userId:1, 
                    }
                },
            }
        ],
    });
}



/**
 * 为某个用户设置角色列表
 * @param {Integer} userId 
 * @param {Array} roles 
 */
function updateRolesOfUser(userId,roles=[]){
    return domain.user.findById(userId)
        .then(user=>{
            if(user){
                return user.setRoles(roles);
            }else{
                return Promise.reject(`user with id ${userId} not found`);
            }
        });
}

/**
 * 为某个用户设置角色列表
 * @param {Integer} userId 
 * @param {Array} roles 
 */
function updateRolesOfUsername(username,roles=[]){
    return domain.user.findOne({where:{username}})
        .then(user=>{
            if(user){
                return user.setRoles(roles);
            }else{
                return Promise.reject(`user with id ${userId} not found`);
            }
        });
}




module.exports={
    createRole,
    findById,
    findByName,
    remove,
    update,
    list,
    load,
    listRolesOfUser,
    updateRolesOfUser,
    updateRolesOfUsername,
    addRolesForUser,
    removeRolesForUser,
};