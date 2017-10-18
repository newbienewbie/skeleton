import React from 'react';
import {Table,Pagination,Row,Col,message} from 'antd';
import 'whatwg-fetch';
import Datagrid from 'antd-datagrid';
import RoleManager from './role-manager.jsx';
import PasswordManager from './password-manager.jsx';

/**
 * 列表
 */
export class List extends React.Component{
    constructor(props){
        super(props);
        this.state={
            record:{},
        };
    }
    render(){
        return (<div>
            <Datagrid 
                columns={[
                    {title:'id',dataIndex:'id'},
                    {title:'用户名',dataIndex:'username'},
                    {title:'email',dataIndex:'email'},
                    {title:'状态',dataIndex:'state'},
                    {title:'创建时间',dataIndex:'createdAt'},
                    {title:'修改时间',dataIndex:'updatedAt'},
                ]}
                fetch={(page,size,condition)=>{
                    return fetch(`/account/user/list?page=${page}&size=${size}`,{
                            method:'GET',
                            credentials: 'same-origin',
                        })
                        .then(resp=>resp.json());
                }}
                onRowClick={(record,index)=>{
                    this.setState({record});
                }} 
            />
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
}



export default List;
