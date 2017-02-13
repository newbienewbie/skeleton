import React from 'react';
import {Row,Col,Button,message} from 'antd';
import 'whatwg-fetch';
import {ToolBar} from './toolbar.jsx';



export const PostManager=React.createClass({

    getInitialState:function(){
        return {
            post:{},
            onChange:()=>{},
        };
    },

    getDefaultProps:function(){
        return { 
            postId:'',
            record:{}, 
            job:'author',
            afterPublish:()=>{}
        };
    },

    fetchAllRoles:function(){
        // fetch and setState()
    },


    componentDidMount:function(){
        this.fetchAllRoles();
    },

    /**
     * 当收到属性时
     */
    componentWillReceiveProps:function(nextProps){
        if(nextProps.record.id==this.props.record.postId){
            return;
        }else{
            this.setState({post:nextPorps.record});
        }
    },

    render:function(){
        return (<div>
            <ToolBar role={this.props.job} 
                onPublish={()=>{
                    fetch(`/post/publish?id=${this.props.postId}`,{
                        method:'post',
                        credentials:'same-origin',
                    })
                    .then(resp=>resp.json())
                    .then(info=>{
                        if(info.status=="SUCCESS"){
                            console.log(info);
                            message.info(`发布文章成功！`);
                        }
                        else{ 
                            console.log(info);
                            message.error(`发布文章失败！`);
                        }
                    }).then(()=>{
                        this.props.afterPublish.call();
                    });
                }} 
            />
        </div>);
    },
})


export default PostManager;