import React from 'react';
import {Row,Col,Button,message} from 'antd';
import {ToolBar} from './toolbar.jsx';
import {model} from '../_common/model';



export class Manager extends React.Component{

    constructor(props){
        super(props);
        this.state={
            ebook:{},
            onChange:()=>{},
        };
    }



    componentDidMount(){
    }

    /**
     * 当收到属性时
     */
    componentWillReceiveProps(nextProps){
        if(nextProps.record.id==this.props.record.id){
            return;
        }else{
            this.setState({ebook:nextPorps.record});
        }
    }

    render(){
        return (<div>
            <ToolBar job={this.props.job} id={this.props.id}
                onPublish={()=>{
                    return model.methods.publish(this.props.id)
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
                    return model.methods.approval(this.props.id)
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
                    return model.methods.senback(this.props.id)
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
                    return model.methods.reject(this.props.id)
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

Manager.defaultProps={
    id:'',
    record:{}, 
    job:'author',
    afterOperation:()=>{}
};


export default Manager;