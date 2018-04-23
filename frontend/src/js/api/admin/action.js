import {API} from 'tiny-api';



export const actionapi=API('action');

const client=actionapi.getTransport();

const defaultClientOpts= {
    headers:{
        'Content-Type':'application/json',
    },
};


actionapi.getActionList=function(){
    return client.post(`/action/list`)
        .then( resp=>resp.data,e=>{throw e;});
}

actionapi.getActionTree=function(scope){
    return client.post(`/action/tree`,
        {
            scope,
        },
        defaultClientOpts
    ).then( resp=>resp.data,e=>{throw e;});
}


export default actionapi;