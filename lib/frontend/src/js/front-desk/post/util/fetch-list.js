
export function fetchList(categoryId=null,page=1,size=8){
    return fetch('/post/recent', {
        method: 'post',
        credentials: 'same-origin',
        headers: { "Content-Type": "application/json", },
        body: JSON.stringify({ page, size, categoryId, }),
    }).then(resp => resp.json())
    .then(result => {
        const rows = result.rows.map(i => {
            // 用于指定到详情页的客户端路由
            const detailUrl = `/#/post/detail/${i.id}`;
            return {
                id: i.id,
                title: i.title,
                author: i.author.username,
                authorUrl: i.author.username,
                imageUrl: i.posterUrl,
                detailUrl,
                excerpt: i.description,
                publishedAt: new Date(),
            };
        });
        return { entities: rows, count: result.count };
    });
}


export default fetchList;