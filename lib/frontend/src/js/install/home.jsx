import React from 'react';
import {Link} from 'react-router';
import {Card,Row,Col,Button,Steps} from 'antd';
import Request from './request.js';


const Home=React.createClass({

    getInitialState:function(){
        return {
            current:0,
            status:'wait',
        };
    },

    install:function(){
        
    },

    render: function () {
        return (
        <div>
            <Row>
                <Col md={4} > 安装网站： </Col>
                <Col md={18}>
                    <Button type="primary" onClick={this.install}> 开始 </Button> 
                </Col>
            </Row>
            <Row>
                <Col md={18}>
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