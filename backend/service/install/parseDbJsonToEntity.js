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

function category(list=[{id:'',h_name:'',description:'',createdAt:'',updatedAt:''}]){
    return list.map(i=>{
        return {
            id:i.id,
            name:i.h_name,
            note:i.note,
            createdAt:i.createdAt,
            updatedAt:i.updatedAt,
        };
    });
}



function ebook(list={ "id": 1, "title": "", "author": "", "description": "", "isbn": "", "category_id": 1, "poster_url": "#", "url": "", "note": null, "uploaderId": 1, "status": "", "createdAt": "", "updatedAt": "" }){
    return list.map(i=>{
        return {
            id:i.id,
            title:i.title,
            author:i.author,
            description:i.description,
            isbn:i.isbn,
            categoryId:i.category_id,
            posterUrl:i.poster_url,
            url:i.url,
            note:i.note,
            uploaderId:i.uploaderId,
            status:i.status,
            createdAt:i.createdAt,
            updatedAt:i.updatedAt,
        };
    });
}

module.exports={
    role,ebook,
};
