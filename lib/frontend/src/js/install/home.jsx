import React from 'react';
import {Link} from 'react-router';
import {Card,Row,Col,Button,Steps,Form,Input,Alert} from 'antd';
import Request from './request.js';


const Home=React.createClass({

    getInitialState:function(){
        return {
            current:0,
            status:'wait',
            msg:'',
            rootUser:{
                username:'',
                password:'',
                email:'',
            },
        };
    },

    promiseSetState:function(state){
        this.setState(state,()=>{
            console.log(`已经进行到step: ${this.state.current} `);
            return Promise.resolve(this.state);
        });
    },

    install:function(){
        // 依次安装 ，设置状态
        this.setState({status:'process'},()=>{
            let current=0;
            // 创建数据库
            Request.createDb()
                .then(()=>{
                    //完成后，进入下一步骤
                    return this.promiseSetState({current:++current},);
                })
            // 创建根用户
            .then(
                ()=>{
                    const rootUser=this.state.rootUser;
                    return Request.createRootUser(rootUser.username,rootUser.password,rootUser.email);
                }
            )
                .then(()=>{
                    return this.promiseSetState({current:++current});
                })
            .catch(e=>{
                console.log(this.state);
                return this.setState({ status:'error',current:current,msg:e.msg});
            });
        });

    },

    render: function () {
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        return (
        <div>
            <Row>
                <Col md={18}>
                    <Form horizontal>
                        <Form.Item label="帐户名" {...formItemLayout}  >
                            <Input onChange={()=>{}} />
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
            <Row>
                <Col md={4} > 安装网站： </Col>
                <Col md={18}>
                    <Button type="primary" onClick={this.install}> 开始 </Button> 
                </Col>
            </Row>
            <Row>
                <Col md={18}>
                    <Alert message={this.state.msg} type={this.state.status=='error'?'error':'info'} />
                    <Card title="安装进度">
                        <Steps direction="vertical" current={this.state.current} status={this.state.status}>
                            <Steps.Step title="安装数据库" description="数据库安装" />
                            <Steps.Step title="创建超级管理员" description="安装超级管理员" />
                            <Steps.Step title="填充基本的数据" description="填充角色表、语言表、国家表" />
                            <Steps.Step title="完成" description="" />
                        </Steps>
                    </Card>
                </Col>
            </Row>
        </div>);
    }
});



export default Home;