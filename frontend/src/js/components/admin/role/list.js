import React from 'react';
import {Row,Col,Table,Modal,Popconfirm,message} from 'antd';
import {listRoles,listRolesOfCurrentUser,updateRole} from '../../../api/admin';
import {AddOrEditFormModal} from './_common/add-or-edit-form';
import {datagrid} from "./adminui";
import {model} from './_common/model';


const DG=datagrid.create(model,AddOrEditFormModal);

export class List extends React.Component{
    render(){
        return <DG/> ;
    }
}
