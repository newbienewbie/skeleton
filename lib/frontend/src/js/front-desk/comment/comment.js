import React from 'react';
import 'whatwg-fetch';
import Pagination from 'simple-react-ui/dist/pagination';
import {CommentForm}  from './comment-form';
import {CommentList} from './comment-list';



/**
 * 从服务器获取评论列表
 * @param {Number} page 评论分页页码
 * @param {Number} size 评论分页每页数量
 */
function _fetchCommentList(scope,topicId,page=1,size=8){
    return fetch("/comment/list",{
        method:'post',
        credentials:'same-origin',
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({scope, topicId, page, size, }),
    })
    .then(resp=>resp.json())
    .then(result=>{
        const comments=result.rows.map(c=>{
            c.author.name=c.author.username;
            return c;
        });
        const total=result.count;
        return {comments,total};
    });
}

/**
 * 提交创建评论的请求
 */
function _create(scope,topicId,content){
    return fetch(`/comment/new`,{
        method:'post',
        credentials:'same-origin',
        headers:{
            'Content-Type':'application/json',
        },
        body:JSON.stringify({ scope, topicId, content:value, })
    })
    .then(resp=>resp.json())
}



/**
 * Comment 组件，开箱即用，可以自定义fetchCommentList和create属性
 */
export const Comment=React.createClass({
    
    getDefaultProps:function(){
        return {
            topicId:null,
            scope:'post',
            fetchCommentList:_fetchCommentList,
            create:_create,
        };
    },

    getInitialState:function(){
        return {
            comments:[
                {id:null,author:{name:'',email:'',avatarUrl:'#',introduction:'',},content:'',createdAt:new Date(),updatedAt:new Date(),upvotes:0,downvotes:0,},
            ],
            total:0,
            page:1,
            size:10,
        };
    },

    componentDidMount:function(){
        const {scope,topicId}=this.props;
        this.props.fetchCommentList(scope,topicId,1,this.state.size)
            .then((result)=>{
                const {comments,total}=result;
                this.setState({comments,total});
            });
    },


    render:function () {
        return (<div>
            <CommentForm author={{avatarUrl:'#'}} onSubmit={value=>{
                this.props.create(this.props.topicId,value)
                    .then(info=>{
                        const {scope,topicId}=this.props;
                        const {page,size}=this.state;
                        return this.props.fetchCommentList(scope,topicId,page,size);
                    }).then((result)=>{
                        const {comments,total}=result;
                        this.setState({comments,total});
                    });
            }} />
            <CommentList comments={this.state.comments}/>
            <Pagination current={this.state.page} size={this.state.size} total={this.state.total} 
                onChange={(page)=>{
                    const {scope,topicId}=this.props;
                    this.props.fetchCommentList(scope,topicId,page,this.state.size)
                        .then(result=>{
                            const {comments,total}=result;
                            this.setState({ comments,total,page });
                        });
                }}
            />
        </div>);
    }
});

export default Comment;