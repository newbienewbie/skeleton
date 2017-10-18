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