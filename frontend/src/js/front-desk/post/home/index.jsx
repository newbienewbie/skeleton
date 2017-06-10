import React from 'react';
import {List} from '../../entity-list';
import {entityToItem} from '../util/list-item';
import {fetchList} from '../util/fetch-list';
import 'whatwg-fetch';
import Pagination from 'simple-react-ui/dist/pagination';


const Home=React.createClass({

    render:function () {
        return (<List 
            fetch={(categoryId=null,page=1,size=8)=>{
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
                            imageUrl: i.featureImageUrl,
                            detailUrl,
                            excerpt: i.excerpt,
                            publishedAt: new Date(),
                        };
                    });
                    return { entities: rows, count: result.count };
                });
            }}
            entityToItem={entityToItem}  />);
    }
});


export default Home;

