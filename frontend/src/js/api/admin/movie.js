import {API} from 'tiny-api';



export const movieapi=API('movie');


const client=movieapi.getTransport();

const defaultClientOpts= {
    headers:{
        'Content-Type':'application/json',
    },
};


movieapi.detail=function(id){
    return client.get(`/movie/detail?id=${id}`)
        .then(resp=>resp.data,e=>{throw e;});
};

const _create=movieapi.create;
movieapi.create=function(record,context){
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


const _update=movieapi.update;
movieapi.update=function(id,record,context){
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
function _movieSetStatus(id,action=''){
    return client.post(
        `/movie/${action.trim()}?id=${id}`,
        {},
        defaultClientOpts
    ).then(resp=>resp.data,e=>{throw e;})
}

movieapi.publish=function(id){
    return _movieSetStatus(id,'publish');
};

movieapi.approval=function(id){
    return _movieSetStatus(id,'approval');
};

movieapi.sendback=function(id){
    return _movieSetStatus(id,'sendback');
};

movieapi.reject=function(id){
    return _movieSetStatus(id,'reject');
}