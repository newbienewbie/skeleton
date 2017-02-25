import React from 'react';
import {Article} from './article.jsx';;
import {CommentList}  from './comment/index.jsx';
import 'whatwg-fetch';


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
        })
        .catch(err=>{
            console.log(err);
        });
    },

    render:function () {
        return (<div>
            <Article id={this.props.params.id}/>
            <CommentList comments={this.state.comments}/>
        </div>);
    }
});

export default Detail;