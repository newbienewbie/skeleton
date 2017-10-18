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
}

