import React from 'react';
import Pagination from 'simple-react-ui/dist/pagination';
import {Item} from './item.js';
import './style.less';
import 'whatwg-fetch';



export const List=React.createClass({

    getDefaultProps:function(){
        return {
            categoryId:null,
        };
    },

    getInitialState:function(){
        return {
            posts:[
                {
                    title:'', 
                    author:'', 
                    authorUrl:'#', 
                    publishedAt:new Date(), 
                    imageUrl:'#', 
                    detailUrl:'#', 
                    excerpt:'#' 
                },
            ],
            total:0,
            current:1,
            size:8,
        };
    },

    fetchRecent(page=1,size=8){
        return fetch('/ebook/recent',{
            method:'post',
            credentials:'same-origin',
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                page,
                size,
                categoryId:this.props.categoryId,
            }),
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
            return {posts:list,total:result.count};
        });
    },

    componentDidMount:function(){
        this.fetchRecent(1,this.state.size).then(result=>{
            const {posts,total}=result;
            this.setState({posts,total});
        });
    },

    componentWillUpdate:function(nextProps){
        if(nextProps.categoryId!=this.props.categoryId){
            this.fetchRecent(1,this.state.size).then(result=>{
                const {posts,total}=result;
                this.setState({posts,total});
            });
        }
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


export default List;