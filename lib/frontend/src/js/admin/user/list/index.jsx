import React from 'react';
import {Table,Row,Col,Card,Transfer,Button,Modal,Pagination,message} from 'antd';
import 'whatwg-fetch';
import RoleManager from './role-manager.jsx';

/**
 * 用户列表
 */
const List=React.createClass({

    getDefaultProps:function(){
        return {
            remoteListUrl:'/account/user/list',
            columns:[
                {title:'id',dataIndex:'id'},
                {title:'用户名',dataIndex:'username'},
                {title:'email',dataIndex:'email'},
                {title:'状态',dataIndex:'state'},
                {title:'创建时间',dataIndex:'createdAt'},
                {title:'修改时间',dataIndex:'updatedAt'},
            ],
            onRowClick:(record,index)=>{},
        };
    },

    getInitialState:function(){
        return {
            // 请求改变时会改变的状态
            page:1, size:2,  
            // 响应改变时会改变的状态
            rows:[], total:1,  
            // 其他，比如用户交互时候会改版的状态(实际用户交互也会改变page、size,不再单独列出)
            current:1,
        };
    },

    fetchDataAndSetState:function(page=1,size=10){
        fetch(`${this.props.remoteListUrl}?page=${page}&size=${size}`,{
            method:'GET',
        })
        .then(resp=>resp.json())
        .then(info=>{
            this.setState(
                {
                    total:info.count,
                    rows:info.rows
                },
            );
        })
        .catch(e=>{
            message.error(`错误！${e}`);
        })
    },

    componentDidMount:function(){
        this.fetchDataAndSetState(this.state.page,this.state.size);
    },

    render:function(){
        return (<div className="container">
            <div>
                <Table onRowClick={this.props.onRowClick} dataSource={this.state.rows} columns={this.props.columns} pagination={false}/>
            </div>
            <Pagination total={this.state.total} current={this.state.current}  pageSize={2}
                onChange={(v)=>{
                    this.setState(
                        {current:v},
                        ()=>{ this.fetchDataAndSetState(v,this.state.size); }
                    );
                }} 
            />
        </div>);
    }
});



/**
 * 重置密码
 */
const PasswordManager=React.createClass({

    getDefaultProps:function(){
        return {
            record:[],
            title:'密码管理',
            bordered:true,
        };
    },

    getInitialState:function(){
        return { };
    },


    render:function(){
        return (<Card title={this.props.title} bordered={this.props.bordered} >

            <div>
                当前角色名：{this.props.record.username}
            </div>

            <Button style={{ color:'white', backgroundColor:'red'}} onClick={()=>{
                Modal.confirm({
                    title:'请确认',
                    content:'真要重置密码吗？',
                    onOk:()=>{message.error('此功能敬请期待');},
                    onCancel:()=>{},
                })
            }} >
                重置密码
            </Button>

        </Card>);
    }
});



/**
 * 列表包装器
 */
const ListWrapper=React.createClass({
    getInitialState:function(){
        return {
            record:{},
        };
    },
    render:function(){
        return (<div>
            <List onRowClick={(record,index)=>{
                this.setState({record});
            }} />
            <Row>
                <Col span={12}>
                    <RoleManager record={this.state.record}/>
                </Col>
                <Col span={12}>
                    <PasswordManager record={this.state.record} />
                </Col>
            </Row>
        </div>);
    }
});



module.exports=ListWrapper;
