import React from 'react';
import {Article} from './article.jsx';;
import Comment  from './comment/index.jsx';
import Pagination from 'simple-react-ui/dist/pagination';
import 'whatwg-fetch';

const {CommentForm,CommentList} =Comment;

const Detail=React.createClass({

    getInitialState:function(){
        return {
            comments:[
                {id:1,author:{name:'xx1',email:'',avatarUrl:'#',introduction:'一句话掐死你',},content:'balabala',createdAt:new Date(),updatedAt:new Date(),upvotes:0,downvotes:0,},
                {id:2,author:{name:'xx2',email:'',avatarUrl:'#',introduction:'一句话饿死你',},content:'balabalabalabalabalabalabalabalabalabalabalabala',createdAt:new Date(),updatedAt:new Date(),upvotes:0,downvotes:0,},
            ],
            total:0,
            page:1,
            size:10,
        };
    },

    componentDidMount:function(){
        this.fetchCommentList(1,8).then((result)=>{
            const {comments,total}=result;
            this.setState({comments,total});
        });
    },

    fetchCommentList:function(page=1,size=8){
        return fetch(`/comment/list`,{
            method:'post',
            credentials:'same-origin',
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                topicId:this.props.params.id,
                page,
                size,
            }),
        })
        .then(resp=>resp.json())
        .then(result=>{
            const comments=result.rows.map(c=>{
                c.author.name=c.author.username;
                return c;
            });
            console.log(`fff`,comments);
            const total=result.count;
            return {comments,total};
        });
    },

    render:function () {
        return (<div>
            <Article id={this.props.params.id}/>
            <CommentForm author={{avatarUrl:'#'}} onSubmit={value=>{
                fetch(`/comment/new`,{
                    method:'post',
                    headers:{
                        'Content-Type':'application/json',
                    },
                    body:JSON.stringify({
                        content:value,
                        topicId:this.props.params.id,
                        page:1,
                        size:this.state.size,
                    })
                })
                .then(resp=>resp.json())
                .then(info=>{
                    console.log(info);
                    return this.fetchCommentList();
                }).then((result)=>{
                    const {comments,total}=result;
                    this.setState({comments,total});
                });
            }} />
            <CommentList comments={this.state.comments}/>
            <Pagination current={this.state.page} size={this.state.size} total={this.state.total} 
                onChange={(page)=>{
                    this.fetchCommentList(page,this.state.size)
                        .then(result=>{
                            const {comments,total}=result;
                            this.setState({ comments,total,page });
                        });
                }}
            />
        </div>);
    }
});

export default Detail;