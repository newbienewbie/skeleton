import React from 'react';
import {Button,Alert,Row,Col,message} from 'antd';
import 'whatwg-fetch';



export const Invite=React.createClass({

    getInitialState:function(){
        return {
            code: '...',
        };
    },


    fetchDataAndChangeState:function(){
        return fetch('/account/invite',{
            credentials: 'same-origin',
        })
        .then( resp=>resp.text() )
        .then((code)=>{
            this.setState({ code:code, });
        });
    },

    componentDidMount:function(){
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
        </div>);
    }
});



export default Invite;