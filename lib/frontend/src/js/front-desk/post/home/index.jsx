import React from 'react';
import {Item} from './item.jsx';
import './style.less';
import 'whatwg-fetch';


const Home=React.createClass({


    getInitialState:function(){
        return {
            posts:[
                {
                    title:'白雪飞天横舟渡', 
                    author:'itminus', 
                    authorUrl:'http://www.itminus.com', 
                    publishedAt:new Date(), 
                    imageUrl:'/static/img/react-web.png', 
                    detailUrl:'http://www.itminus.com', 
                    excerpt:'床前明月光，疑是地上霜。举头望明月，低头思故乡。' 
                },
            ],
        };
    },

    componentDidMount:function(){
        fetch('/post/recent',{
            method:'post',
            credentials:'same-origin',
            body:JSON.stringify({
                page:1,
                size:8,
            }),
        }).then(resp=>resp.json())
        .then(list=>{
            return list.map(i=>{
                // 客户端路由
                const detailUrl=`/#/post/detail/${i.id}`;
                return {
                    id:i.id,
                    title:i.title,
                    author:i.author.username,
                    authorUrl:i.author.username,
                    imageUrl:i.featureImageUrl,
                    detailUrl,
                    excerpt:i.excerpt,
                    publishedAt:new Date(),
                };
            });
        })
        .then(list=>{
            this.setState({posts:list});
        })
    },

    render:function () {
        return (<article id="article-container">
            {this.state.posts.map((p,i)=>{
                return <Item key={i} title={p.title} publishedAt={p.publishedAt}
                    author={p.author} authorUrl={p.authorUrl} 
                    imageUrl={p.imageUrl} detailUrl={p.detailUrl}
                    excerpt={p.excerpt} />;
            })}
        </article>);
    }
});


export default Home;

