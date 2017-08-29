import axios from 'axios';

const client=axios.create({
    withCredentials: true,
});


export const createDb=()=>{
    return client.get('/install/create-db')
        .then(resp=>resp.data,(e)=>{throw e;})
        .then(
            info=>{
                if(info.status=="FAIL"){
                    throw info;
                }else{
                    return Promise.resolve(info);
                }
            },
            (e)=>{
                console.log(e);
                throw {
                    status:'FAIL',
                    msg:e.toString(),
                };
            }
        );
};


export const createRootUser=(username,password,email)=>{
    return client.post('/install/create-root-user',{
        headers:{
            'Content-Type':'application/json',
        },
        data:JSON.stringify({username,password,email}),
    })
    .then(resp=>resp.data,(e)=>{throw e;})
    .then(info=>{
        if (info.status == "FAIL") {
            throw info;
        } else {
            return Promise.resolve(info);
        }
    })
    ;
};


export const initializeTable=()=>{
    return client.post('/install/init-db')
        .then(resp=>resp.data,(e)=>{throw e;})
        .then(
            info=>{
                if(info.status=="FAIL"){
                    throw info;
                }else{
                    return Promise.resolve(info);
                }
            },
            (e)=>{
                console.log(e);
                throw {
                    status:'FAIL',
                    msg:e.toString(),
                };
            }
        );
};



export default {
    createDb,
    createRootUser,
    initializeTable,
};
