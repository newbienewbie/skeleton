import React from 'react';
import {CommentItem} from './comment-item.js'; 
import {CommentForm} from './comment-form.js';
import './style.less';


export const CommentList=React.createClass({
    getDefaultProps:function(){
        return {
            comments:[
                {id:'',author:{name:'',email:'',avatarUrl:'',introduction:'',},content:'',upvotes:0,downvotes:0,createdAt:'',updatedAt:''},
            ],
        };
    },
    render:function () {
        return (<div>
            {this.props.comments.map((c,i)=>{
                return <CommentItem key={i} 
                    id={c.id} author={c.author} content={c.content}
                    createdAt={c.createdAt} updatedAt={c.updatedAt}
                />;
            })}
        </div>);
    }
});


export default {
    CommentList,
    CommentForm
};