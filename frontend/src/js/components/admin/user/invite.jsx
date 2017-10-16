import React from 'react';
import {Button,Alert,Row,Col,message} from 'antd';
import { accountapi } from "../../../api/admin";



export const Invite=React.createClass({

    getInitialState:function(){
        return {
            code: '...',
        };
    },


    fetchDataAndChangeState:function(){
        return accountapi.getInviteCode()
            .then((code)=>{
                this.setState({ code:code, });
            });
    },

    componentDidMount:function(){
    },

    getSiteUrl:function(){
        let host=document.location.host;
        let schema=document.location.protocol?document.location.protocol:"http:";
        let path='/account';
        return schema+"//"+host+path;
    },

    render:function(){
        return (<div>
            <Row>
                <Col span={4}>            
                    <Button onClick={()=>{
                        this.fetchDataAndChangeState()
                            .then(()=>{
                                message.info('生成邀请码成功！');
                            })
                            .catch((e)=>{
                                this.setState({ code:'网络错误',} ,()=>{
                                    message.error('错误！请检查网络连接')
                                    console.log(e);
                                });
                            });
                    }}>
                        生成邀请码
                    </Button>
                </Col>
                <Col span={18}><Alert message={this.state.code} type="success" /> </Col>
            </Row>
            <Row>
                <Col span={4}>
                   注册地址 
                </Col>
                <Col span={4}>
                    {`${this.getSiteUrl()}`}
                </Col>
            </Row>
        </div>);
    }
});



export default Invite;