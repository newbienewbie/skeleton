function language(list){
    return list;
}

function country(list=[{'name':'',note:'',createdAt:'',updatedAt:''}]){
    return list.map(i=>{
        return {
            name:i.name,
            note:i.note,
            createdAt:i.createdAt,
            updatedAt:i.updatedAt,
        };
    });
}

function role(list=[{id:'',h_name:'',description:'',createdAt:'',updatedAt:''}]){
    return list.map(i=>{
        return {
            id:i.id,
            name:i.h_name,
            description:i.description,
            createdAt:i.createdAt,
            updatedAt:i.updatedAt,
        };
    });
}


module.exports={
    role,
};
