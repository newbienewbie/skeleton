import React from 'react';
import Remarkable from 'remarkable'; 
import 'whatwg-fetch';


export const Ebook=React.createClass({
    getDefaultProps:function () {
        return { id:1, };
    },
    getInitialState:function () {
        return {
            id:'',
            title:'',
            author: '',
            pubdate: '',
            description: '',
            posterUrl:'#',
            url:'#',
            keywords:[],
        };
    },
    componentDidMount:function () {
        let that=this;
        const id=this.props.id;
        fetch(`/ebook/detail?id=${id}`,{
            credentials: 'same-origin'
        })
        .then(function (resp) {
            return resp.json();
        }).then(function (ebook) {
            // const {
            //     id,title,isbn,author,
            //     description,
            //     posterUrl,url,
            //     uploaderId,
            //     keywords,
            //     createdAt,updatedAt
            // }=ebook;

            that.setState(ebook);
        });
    },
    render:function () {
        const remarkable=new Remarkable();
        // const content=remarkable.render(this.state.post.description);
        const content=this.state.description;
        return (<article>
            <h2>{this.state.title}</h2>
            <p>
                <span>作者： {this.state.author}</span>
                <span>发布时间：{this.state.createdAt}</span>
            </p>
            <div><img src={this.state.posterUrl} width="100%" height="100%"/></div>
            <div>关键词：
                {this.state.keywords.map(kw=>{
                    return <span> {kw.tag} </span>;
                })}
            </div>
            <div>
                <span>简介:</span>
                <div dangerouslySetInnerHTML={{__html: content}}></div>
            </div>
            <div><a href={this.state.url} >下载</a></div>
        </article>);
    }
});


export default Ebook;