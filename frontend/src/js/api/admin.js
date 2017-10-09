import {API} from 'tiny-api';

import axios from 'axios';

const client=axios.create({
    withCredentials: true,
});

export const roleapi=API('role');


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
    roleapi,
    listRolesOfCurrentUser,
    updateRolesOfUsername,
};
