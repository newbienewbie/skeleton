import {API} from 'tiny-api';

export const roleapi=API('role');
export const resourceapi=API('resource');
export const accountapi=API('account');
export const categoryapi=API('category');

const client=roleapi.getTransport();

const defaultClientOpts= {
    headers:{
        'Content-Type':'application/json',
    },
};

accountapi.getInviteCode=function(){
    return client.get('/account/invite')
        .then( resp=>resp.data,e=>{throw e;})
};


categoryapi.getCategoryList=function(scope='post'){
    return client.get(`/category/list/${scope}`)
        .then( resp=>resp.data,e=>{throw e;});
}

categoryapi.getCategoryTree=function(scope='post'){
    return client.get(`/category/tree/${scope}`)
        .then( resp=>resp.data,e=>{throw e;});
}


export function listRolesOfCurrentUser(page=1,size=8,condition={}){
    return client.post('/role/list',
        JSON.stringify({page,size,condition}),
        defaultClientOpts
    ).then(resp=>resp.data,e=>{throw e;});
}

export function updateRolesOfUsername(username,roles){
    return client.post('/role/update-roles-of-username',
        JSON.stringify({username,roles}),
        defaultClientOpts
    ).then(resp=>resp.data,e=>{throw e;});
}



/**
 * 用于创建资源，和相应的资源-角色关联
 */
resourceapi.createResourceOfRole=function(record,context){
    return client.post(
        `resource/create-resource-of-role`,
        JSON.stringify({record,context}),
        defaultClientOpts
    );
}



/**
 * 用于删除资源-角色的关联，如果指定了 context.headItem.id ，则取消和相应的角色关联
 * @param {Number} id : resouceId,
 * @param {Object} context :
 */
resourceapi.removeResouceOfRole=function(id,context){
    const roleId=context.headItem.id;
    const payload={
        context:{
            headItem:{id:roleId},
        },
        record:{ id }
    };
    return client.post(
            '/resource/remove-resource-of-role',
            JSON.stringify(payload),
            defaultClientOpts
        ).then(resp=>resp.data,e=>{throw e;});
}


/**
 * 列举某角色的资源
 */
resourceapi.listResourcesOfRole=function(page=1,size=8,condition={},context){
    const payload={
        page,size,condition,
        context
    };
    return client.post(
        '/resource/list-resources-of-role',
        JSON.stringify(payload),
        defaultClientOpts
    ).then(
        resp=> resp.data,
        e=>{throw e;}
    );
};


/**
 * 判断一系列资源是否属于某个角色
 */
resourceapi.determineWhetherResourcesAssociatedWithRole=function(resourceIds=[],context){
    const payload={
        resourceIds,
        context,
    };
    return client.post(
        '/resource/whether-resources-associated-with-role',
        JSON.stringify(payload),
        defaultClientOpts
    ).then(resp=>resp.data,e=>{throw e;});
};


/**
 * 授权资源给某角色
 */
resourceapi.grantResourceToRole=function(resourceId,context){
    const payload={
        resourceId,
        context,
    };
    return client.post(
        '/resource/grant-resource-to-role',
        JSON.stringify(payload),
        defaultClientOpts
    ).then(resp=>resp.data,e=>{throw e;});
};


/**
 * 授权资源给某角色
 */
resourceapi.grantResourceToRoleCancel=function(resourceId,context){
    const payload={
        resourceId,
        context,
    };
    return client.post(
        '/resource/grant-resource-to-role-cancel',
        JSON.stringify(payload),
        defaultClientOpts
    ).then(resp=>resp.data,e=>{throw e;});
};


export default {
    accountapi,
    roleapi,
    resourceapi,
    listRolesOfCurrentUser,
    updateRolesOfUsername,
};
