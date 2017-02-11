import React from 'react';
import {Row,Col,Button} from 'antd';
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
            <ToolBar role='censor' />
        </div>);
    },
})


export default PostManager;