import React from 'react';
import Remarkable from 'remarkable'; 
import 'whatwg-fetch';


export const Article=React.createClass({
    getDefaultProps:function () {
        return {
            id:1,
        };
    },
    getInitialState:function () {
        return {
            post:{
                id:'',
                title:'',
                author: '',
                pubdate: '',
                isMarkdown:false,
                content: '',
            }
        };
    },
    componentDidMount:function () {
        let that=this;
        const id=this.props.id;
        fetch(`/post/detail?id=${id}`,{
            credentials: 'same-origin'
        })
        .then(function (resp) {
            return resp.json();
        }).then(function (post) {
            console.log(post);
            that.setState({
                post:{
                    id:post.id,
                    title:post.title,
                    author:post.author,
                    pubdate:post.pubdate,
                    isMarkdown:post.isMarkdown,
                    content:post.content,
                }
            });
        });
    },
    render:function () {
        const remarkable=new Remarkable();
        const content=this.state.post.isMarkdown ?
            remarkable.render(this.state.post.content) :
            this.state.post.content;
        return (<article className="post-detail">
            <h1>{this.state.post.title}</h1>
            {this.state.post.id}
            <p>
                <span>作者： {this.state.post.author}</span>
                <span>发布时间：{this.state.post.pubdate}</span>
            </p>
            <div dangerouslySetInnerHTML={{__html: content}}></div>
        </article>);
    }
});


export default Article;