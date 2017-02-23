import React from 'react';

/**
 * 评论组件，分成三部分
 * * 头部，元信息(作者、统计信息)
 * * 主体：评论
 * * 尾部：操作区
 */
export const CommentItem=React.createClass({

    getDefaultProps:function(){
        return {
            id:'',
            author:{name:'',email:'',avatarUrl:'',introduction:'',},
            content:'',
            upvotes:0,
            downvotes:0,
            createdAt:new Date(),
            updatedAt:new Date(),
        };
    },
    
    render() {
        return (<div className='comment-item'>
            {/* header */}
            <div>
                <div>
                    <div>
                        <img src={this.props.author.avatarUrl}/>
                    </div>
                    <div>
                        <span><a href={'#'}>{this.props.author.name}</a></span>
                        <div>{this.props.author.introduction}</div>
                    </div>
                </div>
                <div>
                    <div>{this.props.upvotes}人赞同</div>
                    <div>{this.props.downvotes}人反对</div>
                </div>
            </div>
            {/* body */}
            <div>
                <p>{this.props.content}</p>
                <p>修改于 {this.props.updatedAt.toString()}</p>
            </div>
            {/* footer */}
            <div>
                <button>赞同</button>
                <button>感谢</button>
                <button>反对</button>
                <button>无意义</button>
                <button>评论</button>
                <button>收藏</button>
                <button>举报</button>
            </div>
        </div>);
    }
});


export default CommentItem;
