import {API} from 'tiny-api';



export const categoryapi=API('category');

const client=categoryapi.getTransport();

const defaultClientOpts= {
    headers:{
        'Content-Type':'application/json',
    },
};


categoryapi.getCategoryList=function(scope='post'){
    return client.get(`/category/list/${scope}`)
        .then( resp=>resp.data,e=>{throw e;});
}

categoryapi.getCategoryTree=function(scope='post'){
    return client.get(`/category/tree/${scope}`)
        .then( resp=>resp.data,e=>{throw e;});
}


export default categoryapi;