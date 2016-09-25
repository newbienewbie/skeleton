import React from 'react';
import {Table,Pagination,message} from 'antd';
import 'whatwg-fetch';



const List=React.createClass({

    getDefaultProps:function(){
        return {
            remoteListUrl:'/account/user/list',
            columns:[
                {title:'id',dataIndex:'id'},
                {title:'用户名',dataIndex:'username'},
                {title:'email',dataIndex:'email'},
                {title:'角色',dataIndex:'roles'},
                {title:'状态',dataIndex:'state'},
                {title:'创建时间',dataIndex:'createdAt'},
                {title:'修改时间',dataIndex:'updatedAt'},
            ],
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
                ()=>{console.log(this.state)}
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
                <Table dataSource={this.state.rows} columns={this.props.columns} pagination={false}/>
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




module.exports=List;
