import React from 'react';
import Datagrid from 'antd-datagrid';
import {Row,Col,message} from 'antd';
import 'whatwg-fetch';



export const List=React.createClass({

    getInitialState(){
        return {id:'',refreshCode:1};
    },

    getDefaultProps(){
    },

    render:function(){
        return (<div>
            <Datagrid 
                refreshCode={this.state.refreshCode}
                columns={[
                    {title:'ID',dataIndex:'id'},
                    {title:'标题',dataIndex:'title'}, 
                    {title:'别名',dataIndex:'knownAs'},
                    {title:'上映日期',dataIndex:'releaseAt'},
                    {title:'关键词',dataIndex:'keyWord'},
                    {title:'创建于',dataIndex:'createdAt'},
                    {title:'更新于',dataIndex:'updatedAt'},
                ]}
                fetch={(page,size,condition)=>{
                    return fetch('/movie/list',{
                        method:'post',
                        credentials:'same-origin',
                        headers:{
                            'Content-Type':'application/json'
                        },
                        body:JSON.stringify({page,size,condition})
                    }).then(resp=>resp.json());
                }} 
                onRowClick={(record,index)=>{
                    this.setState({id:record.id},()=>{
                        message.info(`click row ${record.id}`);
                    });
                }}
            />
        </div>);
    }
})


export default List;