import React from 'react';
import Datagrid from 'antd-datagrid';
import 'whatwg-fetch';



export const List=React.createClass({

    render:function(){
        return (<div>
            <Datagrid 
                columns={[
                    {title:'标题',dataIndex:'title'}, 
                    {title:'状态',dataIndex:'status'},
                    {title:'创建于',dataIndex:'createdAt'},
                    {title:'更新于',dataIndex:'updatedAt'},
                ]}
                fetch={(page,size,condition)=>{
                    return fetch('/post/list',{
                        method:'post',
                        credentials:'same-origin',
                        headers:{
                            'Content-Type':'application/json'
                        },
                        body:JSON.stringify({page,size,condition})
                    }).then(resp=>resp.json())
                }} 
                onRowClick={(record,index)=>{
                    console.log(record,index);
                }}
            />
        </div>);
    }
})


export default List;