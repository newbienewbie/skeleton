import {API} from 'tiny-api';



export const postapi=API('post');

const client=postapi.getTransport();

const defaultClientOpts= {
    headers:{
        'Content-Type':'application/json',
    },
};

postapi.detail=function(id){
    return client.get(`/post/detail?id=${id}`)
        .then(resp=>resp.data,e=>{throw e;});
};

const _create=postapi.create;
postapi.create=function(record,context){
    let {featureImageUrl}=record;
    if(Array.isArray(featureImageUrl)){
        featureImageUrl=featureImageUrl.map(i=>{
            const {lastModified, lastModifiedDate, name,
                originFileObj, percent, response, size, type, uid, url}=i;
            return {lastModified, lastModifiedDate, name,
                originFileObj, percent, response, size, type, uid, url};
        });
    }
    record.featureImageUrl=featureImageUrl;
    return _create(record,context);
}


const _update=postapi.update;
postapi.update=function(id,record,context){
    let {featureImageUrl}=record;
    if(Array.isArray(featureImageUrl)){
        featureImageUrl=featureImageUrl.map(i=>{
            const {lastModified, lastModifiedDate, name,
                originFileObj, percent, response, size, type, uid, url}=i;
            return {lastModified, lastModifiedDate, name,
                originFileObj, percent, response, size, type, uid, url};
        });
    }
    record.featureImageUrl=featureImageUrl;
    return _update(id,record,context);
}


/**
 * 设置文章状态
 * @param {Number} id 
 * @param {String} action 
 */
function _postSetStatus(id,action=''){
    return client.post(
        `/post/${action.trim()}?id=${id}`,
        {},
        defaultClientOpts
    ).then(resp=>resp.data,e=>{throw e;})
}

postapi.publish=function(id){
    return _postSetStatus(id,'publish');
};

postapi.approval=function(id){
    return _postSetStatus(id,'approval');
};

postapi.sendback=function(id){
    return _postSetStatus(id,'sendback');
};

postapi.reject=function(id){
    return _postSetStatus(id,'reject');
}