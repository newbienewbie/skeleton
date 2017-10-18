import React from 'react';
import Datagrid from 'antd-datagrid';
import {Row,Col} from 'antd';
import 'whatwg-fetch';
import {Manager} from './manager.jsx';

export class List extends React.Component{

    constructor(props){
        super(props);
        this.state={
            ebookId:'',
            refreshCode:1
        };
    }

    render(){
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
                    this.setState({ebookId:record.id},()=>{
                        console.log('click row ',record);
                    });
                }}
            />
            <Manager job={this.props.job} id={this.state.ebookId} 
                afterOperation={()=>{
                    const that=this;
                    return new Promise(function(resolve,reject){
                        that.setState(
                            {refreshCode:that.state.refreshCode+1},
                            function(){ resolve(); }
                        );
                    });
                }}
            />
        </div>);
    }
}

List.defaultProps={
    job:'author',
};


export default List;