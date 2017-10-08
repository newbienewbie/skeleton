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

export function removeRole(id){
    return client.post('/role/remove',
        JSON.stringify({id}),
        {
            headers:{
                'Content-Type':'application/json',
            }
        },
    ).then(resp=>resp.data,(e)=>{throw e;});
}


export function updateRole(id,name,description){
    return client.post('/role/update',
        JSON.stringify({id,name,description}),
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

export function updateRolesOfUsername(username,roles){
    return client.post('/role/update-roles-of-username',
        JSON.stringify({username,roles}),
        {
            headers:{
                'Content-Type':'application/json',
            },
        }
    ).then(resp=>resp.data,e=>{throw e;});
}


export default {
    createRole,
    listRoles,
    listRolesOfCurrentUser,
    updateRolesOfUsername,
};
