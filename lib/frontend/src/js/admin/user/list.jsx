import React from 'react';
import {Table,Card,Transfer,Button,Pagination,message} from 'antd';
import 'whatwg-fetch';


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
 * 角色管理
 */
const RoleManager=React.createClass({

    getInitialState:function(){
        return {
            dataSource:[],
            targetKeys:[],
            onChange:()=>{},
        };
    },

    getDefaultProps:function(){
        return { 
            title:'角色管理',
            bordered:false,
            record:{}, 
        };
    },

    fetchAllRoles:function(){
        return fetch('/role/list')
            .then(resp=>resp.json())
            .then(roles=>{
                this.setState({
                    dataSource:roles.map(r=>{
                        return {
                            key:r.id,
                            id:r.id,
                            title:r.name,
                            description:r.description,
                        };
                    }),
                });
            })
    },

    componentDidMount:function(){
        this.fetchAllRoles();
    },
    /**
     * 当收到属性时，
     *     1. 更新当前用户对应的targetKeys：载入新属性中的记录的roles 到当前state
     *     2. 重置dataSource
     */
    componentWillReceiveProps:function(nextProps){
        if(nextProps.record.username==this.props.record.username){
            return;
        }else{
            let roles=nextProps.record.roles;
            let targetKeys=typeof roles =="object"? roles: JSON.parse(roles);
            Promise.all([
                this.setState({ targetKeys}),
                this.fetchAllRoles()
            ]);
        }
    },

    render:function(){
        return (<Card title={this.props.title} bordered={this.props.bordered}  >

            <div>
                当前角色名：{this.props.record.username}
            </div>

            <Transfer titles={['角色池','赋予的角色']}
                dataSource={this.state.dataSource} 
                targetKeys={this.state.targetKeys} 
                render={item=>item.title}
                onChange={(targetKeys)=>{this.setState({targetKeys})}}
            />

            <div>
                <Button type="primary" onClick={()=>{
                    console.log(this.state.targetKeys);
                }}>
                    确定
                </Button>
            </div>
        </Card>);
    },
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
            <RoleManager record={this.state.record}/>
        </div>);
    }
});



module.exports=ListWrapper;
