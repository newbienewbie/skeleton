import {API} from 'tiny-api';



export const ebookapi=API('ebook');


const client=ebookapi.getTransport();

const defaultClientOpts= {
    headers:{
        'Content-Type':'application/json',
    },
};


ebookapi.detail=function(id){
    return client.get(`/ebook/detail?id=${id}`)
        .then(resp=>resp.data,e=>{throw e;});
};

const _create=ebookapi.create;
ebookapi.create=function(record,context){
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


const _update=ebookapi.update;
ebookapi.update=function(id,record,context){
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
function _ebookSetStatus(id,action=''){
    return client.post(
        `/ebook/${action.trim()}?id=${id}`,
        {},
        defaultClientOpts
    ).then(resp=>resp.data,e=>{throw e;})
}

ebookapi.publish=function(id){
    return _ebookSetStatus(id,'publish');
};

ebookapi.approval=function(id){
    return _ebookSetStatus(id,'approval');
};

ebookapi.sendback=function(id){
    return _ebookSetStatus(id,'sendback');
};

ebookapi.reject=function(id){
    return _ebookSetStatus(id,'reject');
}