import React from 'react';
import 'whatwg-fetch';

export function fetchList(categoryId=null,page=1,size=8){
   return fetch('/ebook/recent',{
            method:'post',
            credentials:'same-origin',
            headers:{ "Content-Type":"application/json", },
            body:JSON.stringify({ page, size, categoryId, }),
        }).then(resp=>resp.json())
        .then(result=>{
            const list=result.rows.map(i=>{
                // 客户端路由
                const detailUrl=`/#/ebook/detail/${i.id}`;
                return {
                    id:i.id,
                    title:i.title,
                    author:i.author.username,
                    authorUrl:i.author.username,
                    imageUrl:i.posterUrl,
                    detailUrl,
                    excerpt:i.description,
                    publishedAt:new Date(),
                };
            });
            return {entities:list,count:result.count};
        });
}

export default fetchList;