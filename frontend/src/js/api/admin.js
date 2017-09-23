import axios from 'axios';

const client=axios.create({
    withCredentials: true,
});



export function createRole(name,description){
    return client.post('',{
        headers:{
            'Content-Type':'application/json',
        },
        data:JSON.stringify({name,description}),
    }).then(resp=>resp.data,(e)=>{throw e;});
}


export default {
    createRole,
};
