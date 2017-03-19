import React from 'react';
import {Item} from './item.js';
import './style.less';
import 'whatwg-fetch';
import Pagination from 'simple-react-ui/dist/pagination';


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
            total:0,
            current:1,
            size:8,
        };
    },

    fetchRecent(page=1,size=8){
        return fetch('/post/recent',{
            method:'post',
            credentials:'same-origin',
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                page,
                size,
            }),
        }).then(resp=>resp.json())
        .then(result=>{
            const list=result.rows.map(i=>{
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
            return {posts:list,total:result.count};
        });
    },

    componentDidMount:function(){
        this.fetchRecent(1,this.state.size).then(result=>{
            const {posts,total}=result;
            this.setState({posts,total});
        })
    },

    render:function () {
        return (<div id="article-container">
            <article>
                {this.state.posts.map((p,i)=>{
                    return <Item key={i} title={p.title} publishedAt={p.publishedAt}
                        author={p.author} authorUrl={p.authorUrl} 
                        imageUrl={p.imageUrl} detailUrl={p.detailUrl}
                        excerpt={p.excerpt} />;
                })}
            </article>
            <div>
                <Pagination size={this.state.size} current={this.state.current} total={this.state.total}
                    onChange={page=>{
                        this.fetchRecent(page,this.state.size)
                            .then(result=>{
                                const {posts,total}=result;
                                this.setState({
                                    current:page,total,posts,
                                });
                            });
                    }}
                />
            </div>
        </div>);
    }
});


export default Home;

