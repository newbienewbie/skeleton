import React from 'react';
import {Table,Pagination} from 'antd';



const Datagrid=React.createClass({

    getDefaultProps:function(){
        return {
            columns:[ ],
            onRowClick:(record,index)=>{},
            fetcher:(page,size,condition)=>{return new Promise(()=>{return {rows:[],count:0};});},
            condition:{},
        };
    },

    getInitialState:function(){
        return { dataSource:[], total:0, size:5, current:1, };
    },

    componentDidMount:function(){
        this.fetchAndSetState(this.state.current,this.state.size,{});
    },

    fetchAndSetState:function(page,size,condition,...args){
        this.props.fetcher(page,size,condition)
            .then(info=>{
                this.setState({
                    dataSource:info.rows,
                    total:info.count,
                    current:page,
                });
            })
    },

    render:function(){
        return (<div>
            <Table dataSource={this.state.dataSource} columns={this.props.columns} onRowClick={this.props.onRowClick} pagination={false} />
            <Pagination total={this.state.total} pageSize={this.state.size} current={this.state.current} 
                onChange={(page)=>{
                    this.setState({current:page},()=>{
                        this.fetchAndSetState(page,this.state.size,this.props.condition);
                    });
                }} 
            />
        </div>);
    }
});



export default Datagrid;