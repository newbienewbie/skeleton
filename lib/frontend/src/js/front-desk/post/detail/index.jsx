import React from 'react';
import {Article} from './article.jsx';;
import Comment  from './comment/index.jsx';
import 'whatwg-fetch';

const {CommentForm,CommentList} =Comment;

const Detail=React.createClass({

    getInitialState:function(){
        return {
            comments:[
                {id:1,author:{name:'xx1',email:'',avatarUrl:'#',introduction:'一句话掐死你',},content:'balabala',createdAt:new Date(),updatedAt:new Date(),upvotes:0,downvotes:0,},
                {id:2,author:{name:'xx2',email:'',avatarUrl:'#',introduction:'一句话饿死你',},content:'balabalabalabalabalabalabalabalabalabalabalabala',createdAt:new Date(),updatedAt:new Date(),upvotes:0,downvotes:0,},
            ],
            page:1,
            size:10,
        };
    },

    componentDidMount:function(){
        this.fetchCommentList();
    },

    fetchCommentList:function(){
        fetch(`/comment/list`,{
            method:'post',
            credentials:'same-origin',
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                topicId:this.props.params.id,
                page:this.state.page,
                size:this.state.size,
            }),
        })
        .then(resp=>resp.json())
        .then(result=>{
            const comments=result.rows.map(c=>{
                c.author.name=c.author.username;
                return c;
            });
            this.setState({comments});
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
                    })
                })
                .then(resp=>resp.json())
                .then(info=>{
                    console.log(info);
                    this.fetchCommentList();
                });
            }} />
            <CommentList comments={this.state.comments}/>
        </div>);
    }
});

export default Detail;