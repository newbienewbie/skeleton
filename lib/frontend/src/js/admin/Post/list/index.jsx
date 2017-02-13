import React from 'react';
import Datagrid from 'antd-datagrid';
import {Row,Col} from 'antd';
import 'whatwg-fetch';
import {PostManager} from './post-manager.jsx';



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
                    }).then(resp=>resp.json());
                }} 
                onRowClick={(record,index)=>{
                    this.setState({postId:record.id});
                }}
            />
            <Row>
                <Col>
                    <PostManager job={this.props.job} postId={this.state.postId} 
                        afterPublish={()=>{
                            this.setState({refreshCode:this.state.refreshCode+1},()=>{message.success(`发表成功`);});
                        }}
                    />
                </Col>
            </Row>
        </div>);
    }
})


export default List;