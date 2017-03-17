import React from 'react';
import Datagrid from 'antd-datagrid';
import {Row,Col} from 'antd';
import 'whatwg-fetch';


export const List=React.createClass({

    getInitialState(){
        return {postId:'',refreshCode:1};
    },

    getDefaultProps(){
        return {
            job:'author',
        };
    },

    render:function(){
        return (<div>
            <Datagrid 
                refreshCode={this.state.refreshCode}
                columns={[
                    {title:'ID',dataIndex:'id'},
                    {title:'标题',dataIndex:'title'}, 
                    {title:'状态',dataIndex:'status'},
                    {title:'创建于',dataIndex:'createdAt'},
                    {title:'更新于',dataIndex:'updatedAt'},
                ]}
                fetch={(page,size,condition)=>{
                    return fetch('/ebook/list',{
                        method:'post',
                        credentials:'same-origin',
                        headers:{
                            'Content-Type':'application/json'
                        },
                        body:JSON.stringify({page,size,condition})
                    }).then(resp=>resp.json());
                }} 
                onRowClick={(record,index)=>{
                    this.setState({postId:record.id},()=>{
                        console.log('click row ',record);
                    });
                }}
            />
        </div>);
    }
})


export default List;