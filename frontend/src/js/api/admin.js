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


export function listRolesOfCurrentUser(){
    return client.post('/role/list',
        {},
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
