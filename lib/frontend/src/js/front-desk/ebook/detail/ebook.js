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
            isbn:'',
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

        let createdAt=this.state.createdAt;
        return (<article className="ebook-detail">
            <h2>{this.state.title}</h2>
            <div>
                <div><img src={this.state.posterUrl} width="100%" height="100%"/></div>
                <div>
                    <dl className="meta">
                        <div>
                            <dt>isbn</dt><dd> {this.state.isbn}</dd>
                        </div>
                        <div>
                            <dt>作者</dt><dd>{this.state.author}</dd>
                        </div>
                        <div>
                            <dt>发布时间</dt><dd>{createdAt}</dd>
                        </div>
                        <div>
                            <dt>关键词</dt>
                            <dd>
                                {this.state.keywords.map(kw=>{
                                    return <span> {kw.tag} </span>;
                                })}
                            </dd>
                        </div>
                    </dl>
                </div>
                <div>
                    <span>简介:</span>
                    <div dangerouslySetInnerHTML={{__html: content}}></div>
                </div>
            </div>
            <div><a target="_blank" href={this.state.url} >下载</a></div>
        </article>);
    }
});


export default Ebook;