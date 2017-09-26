import axios from 'axios';

const client=axios.create({
    withCredentials: true,
});



export function createRole(name,description){
    return client.post('/role/create',
        JSON.stringify({name,description}),
        {
            headers:{
                'Content-Type':'application/json',
            }
        },
    ).then(resp=>resp.data,(e)=>{throw e;});
}


export function listRoles(page=1,size=8,condition={}){
    return client.post('/role/list',
        JSON.stringify({page,size,condition}),
        {
            headers:{
                'Content-Type':'application/json',
            },
        }
    ).then(resp=>resp.data,e=>{throw e;});
}

export function listRolesOfCurrentUser(page=1,size=8,condition={}){
    return client.post('/role/list',
        JSON.stringify({page,size,condition}),
        {
            headers:{
                'Content-Type':'application/json',
            },
        }
    ).then(resp=>resp.data,e=>{throw e;});
}


export default {
    createRole,
    listRolesOfCurrentUser,
};
