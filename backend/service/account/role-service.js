//目前的实现依赖于session
const domain=require('../../domain');
const {Service}=require('tiny-service');

const roleService=Service(domain.role);

/**
 * 创建角色
 */
roleService.createRole=roleService.create;

/**
 * find one role by role name
 * @param {String} rolename 
 */
roleService.findByName=function(rolename){
    return domain.role.findOne({
        where:{
            name:rolename,
        }
    });
};


/**
 * find all rol
 */
roleService.listAll=function(){
    return domain.role.findAll();
};

/**
 * 从数据库中加载指定账户的角色信息到SESSION,
 *     成功则resolve({username,roles})
 *     失败则reject(reason)
 */
roleService.load=function(username,req){
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
};


/**
 * 为某个用户添加已经存在的角色
 * @param {Integer} userId 
 * @param {Integer} roleId
 */
roleService.addRolesForUser=function(userId,roles){
    return domain.user.findById(userId)
        .then(user=>{
            if(user){return user.addRoles(roles);}
            else{throw new Error(`user not found :${userId}`)}
        });
};


/**
 * 为用户移除角色，注意不会删除角色，只是移除用户-角色关系
 * @param {Number} userId 
 * @param {Number} roles 
 */
roleService.removeRolesForUser=function(userId,roles){
    return domain.user.findById(userId)
        .then(user=>{
            if(user){return user.removeRoles(roles);}
            else{throw new Error(`user not found :${userId}`)}
        });
};


/**
 * 获取某个用户的当前角色列表
 * @param {Number} userId 
 * @param {Number} page 
 * @param {Number} size 
 * @param {Object} condition 
 */
roleService.listRolesOfUser=function(userId,page=1,size=8,condition={}){

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
};



/**
 * 为某个用户设置角色列表
 * @param {Integer} userId 
 * @param {Array} roles 
 */
roleService.updateRolesOfUser=function(userId,roles=[]){
    return domain.user.findById(userId)
        .then(user=>{
            if(user){
                return user.setRoles(roles);
            }else{
                return Promise.reject(`user with id ${userId} not found`);
            }
        });
};

/**
 * 为某个用户设置角色列表
 * @param {Integer} userId 
 * @param {Array} roles 
 */
roleService.updateRolesOfUsername=function(username,roles=[]){
    return domain.user.findOne({where:{username}})
        .then(user=>{
            if(user){
                return user.setRoles(roles);
            }else{
                return Promise.reject(`user with id ${userId} not found`);
            }
        });
};


roleService.findByName=function(roleName){
    return domain.role.findOne({
        where:{
            name:roleName,
        }
    });
};

module.exports=roleService;