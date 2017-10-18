import React from 'react';
import {Row,Col,Button,message} from 'antd';
import 'whatwg-fetch';
import {ToolBar} from './toolbar.jsx';



export class PostManager extends React.Component{


    constructor(props){
        super(props);
        this.state={
            post:{},
            record:{},
            onChange:()=>{},
        };
    }


    componentDidMount(){
    }

    /**
     * 当收到属性时
     */
    componentWillReceiveProps(nextProps){
        if(nextProps.record.id==this.props.record.postId){
            return;
        }else{
            this.setState({post:nextProps.record,record:nextProps.record});
        }
    }

    render(){
        return (<div>
            <ToolBar job={this.props.job} postId={this.props.postId} record={this.state.record}
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
                            this.props.afterOperation.call();
                        }
                        else{ 
                            console.log(info);
                            message.error(`发布文章失败！`);
                        }
                    });
                }} 
                onApproval={()=>{
                    fetch(`/post/approval?id=${this.props.postId}`,{
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
                    fetch(`/post/sendback?id=${this.props.postId}`,{
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
                    fetch(`/post/reject?id=${this.props.postId}`,{
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
    }
}

PostManager.defaultProps={
    postId:'',
    record:{}, 
    job:'author',
    afterOperation:()=>{}
};


export default PostManager;