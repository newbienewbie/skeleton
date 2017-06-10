import React from 'react';
import {Row,Col,Button,message} from 'antd';
import 'whatwg-fetch';
import {ToolBar} from './toolbar.jsx';



export const Manager=React.createClass({

    getInitialState:function(){
        return {
            ebook:{},
            onChange:()=>{},
        };
    },

    getDefaultProps:function(){
        return { 
            id:'',
            record:{}, 
            job:'author',
            afterOperation:()=>{}
        };
    },


    componentDidMount:function(){
    },

    /**
     * 当收到属性时
     */
    componentWillReceiveProps:function(nextProps){
        if(nextProps.record.id==this.props.record.id){
            return;
        }else{
            this.setState({ebook:nextPorps.record});
        }
    },

    render:function(){
        return (<div>
            <ToolBar job={this.props.job} id={this.props.id}
                onPublish={()=>{
                    fetch(`/ebook/publish?id=${this.props.id}`,{
                        method:'post',
                        credentials:'same-origin',
                    })
                    .then(resp=>resp.json())
                    .then(info=>{
                        if(info.status=="SUCCESS"){
                            console.log(info);
                            message.info(`发布文章成功！`);
                            this.props.afterOperation.call();
                        }
                        else{ 
                            console.log(info);
                            message.error(`发布文章失败！`);
                        }
                    });
                }} 
                onApproval={()=>{
                    fetch(`/ebook/approval?id=${this.props.postId}`,{
                        method:'post',
                        credentials:'same-origin',
                    }).then(resp=>resp.json())
                    .then(info=>{
                        if(info.status=="SUCCESS"){
                            console.log(info);
                            this.props.afterOperation.call().then(()=>{
                                message.info(`审批文章成功！`);
                            });
                        }
                        else{ 
                            console.log(info);
                            message.error(`审批文章失败！`);
                        }
                        return info;
                    });
                }}
                onSendback={()=>{
                    fetch(`/ebook/sendback?id=${this.props.postId}`,{
                        method:'post',
                        credentials:'same-origin',
                    })
                    .then(resp=>resp.json())
                    .then(info=>{
                        if(info.status=="SUCCESS"){
                            console.log(info);
                            const fn=this.props.afterOperation;
                            fn().then(()=>{
                                message.info(`退回文章成功！`);
                            });
                        }
                        else{ 
                            console.log(info);
                            message.error(`退回文章失败！`);
                        }
                    });
                }} 
                onReject={()=>{
                    fetch(`/ebook/reject?id=${this.props.postId}`,{
                        method:'post',
                        credentials:'same-origin',
                    })
                    .then(resp=>resp.json())
                    .then(info=>{
                        if(info.status=="SUCCESS"){
                            console.log(info);
                            this.props.afterOperation()
                            .then(()=>{
                                message.info(`退回文章成功！`);
                            });
                        }
                        else{ 
                            console.log(info);
                            message.error(`退回文章失败！`);
                        }
                    });
                }}
            />
        </div>);
    },
})


export default Manager;