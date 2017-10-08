import React from 'react';
import {Row,Col,Table,Modal,Popconfirm,message} from 'antd';
import {listRoles,listRolesOfCurrentUser,updateRole} from '../../../api/admin';
import {AddOrEditFormModal} from './_common/add-or-edit-form';
import {datagrid} from "./datagrid";
import {model} from './_common/model';


export class List extends React.Component{
    render(){
        const DG=datagrid.create(model,AddOrEditFormModal);
        return <DG/> ;
    }
}

// export class List extends React.Component{

//     constructor(props){
//         super(props);
//         this.state={
//             data:[],
//             pagination:{},
//             loading:true,
//             editModalVisible:false,
//             currentRecord:{},
//         };
//         this.editForm=null;
//     }

//     onRemove(record){
//         message.warning("hello,world"+record.name);
//     }

    

//     componentDidMount(){
//         this.setState({loading:true},()=>{
//             const {current,pageSize,}=this.state.pagination;
//             return listRoles(current,pageSize).then(roles=>{
//                 const dataSource=roles.map((r,i)=>{
//                     return Object.assign({},r,{key:i});
//                 });
//                 this.setState({data:dataSource,loading:false});
//             });
//         });
//     }


//     render() {
//         const {Column,ColumnGroup}=Table;
//         return (<div>
//             <Table dataSource={this.state.data} pagination={this.state.pagination} loading={this.state.loading} onChange={this.state.onChange} >
//                 <Column title="角色名" dataIndex="name" key="role_name" />
//                 <Column title="角色描述" dataIndex="description" key="role_description" />
//                 <Column title="操作" key="action" render={(text, record) => (
//                     <span>
//                         <a onClick={()=>{
//                             this.setState({editModalVisible:true,currentRecord:record})
//                             return false;
//                         }}
//                         >修改</a>
//                         <span className="ant-divider" />
//                         <Popconfirm title="确认要删除吗" okText="是" cancelText="否"
//                             onConfirm={() => { this.onRemove(record); }}
//                         >
//                             <a href="#">删除</a>
//                         </Popconfirm>
//                         <span className="ant-divider" />
//                     </span>)} />
//             </Table>

//             <AddOrEditFormModal ref={form=>this.editForm=form} visible={this.state.editModalVisible} 
//                 initialValues={this.state.currentRecord}
//                 onOk={_=>{
//                     this.editForm.validateFields((err,values)=>{
//                         if(!err){
//                             const {id}=this.state.currentRecord;
//                             const {name,description}=values;
//                             updateRole(id,name,description)
//                                 .then(resp=>{
//                                     message.success(`修改成功`);
//                                     console.log(resp);
//                                     this.setState({editModalVisible:false},()=>{
//                                         // 刷新数据源
//                                         const {current,pageSize,}=this.state.pagination;
//                                         return listRoles(current,pageSize)
//                                             .then(roles=>{
//                                                 const dataSource=roles.map((r,i)=>{
//                                                     return Object.assign({},r,{key:i});
//                                                 });
//                                                 this.setState({data:dataSource,loading:false});
//                                             });
//                                     });
//                                 })
//                         }
//                     });
//                 }}
//                 onCancel={_=>{
//                     this.setState({editModalVisible:false});
//                 }}
//             />

//         </div>);
//     }
// }