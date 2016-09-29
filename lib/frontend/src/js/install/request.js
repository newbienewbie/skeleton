import 'whatwg-fetch';


export const createDb=()=>{
    return fetch('/install/create-db',{
        credentials: 'same-origin'
    })
    .then(resp=>resp.json(),(e)=>{throw e;})
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
    )
    ;
};


export const createRootUser=(username,password,email)=>{
    return fetch('/install/create-root-user',{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
        },
        credentials: 'same-origin',
        body:JSON.stringify({username,password,email}),
    })
    .then(resp=>resp.json(),(e)=>{throw e;})
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
    return new Promise();
};



export default {
    createDb,
    createRootUser,
    initializeTable,
};
