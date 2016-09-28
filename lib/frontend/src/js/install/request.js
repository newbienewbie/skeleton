import 'whatwg-fetch';


export const createDb=(onSuccess=()=>{},onFail=()=>{})=>{
    fetch('/install/create-db')
        .then(resp=>resp.json())
        .then()
        .catch(e=>{
            onFail(e);
        })
    ;
};


export const createRootUser=(onSuccess=()=>{},onFail=()=>{})=>{
    fetch('/install/create-root-user')
        .then(resp=>resp.json())
        .then(onSuccess,onFail)
        .catch(e=>{
            onFail(e);
        })
    ;
};


export const initializeTable=()=>{
    return new Promise();
};



export {
    createDb,
    createRootUser,
    initializeTable,
};
