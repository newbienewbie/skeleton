import React from 'react';
import {Row,Col,Button,Table,Modal,Popconfirm,message} from 'antd';
import {listRoles,listRolesOfCurrentUser,updateRole} from '../../../api/admin';
import {PlainAddOrEditForm} from './_common/add-or-edit-form';
import {defaultDecoratedForm,datagrid} from "./adminui";
import {model} from './_common/model';


const AddOrEditFormModal=defaultDecoratedForm.createDecoratedAddOrEditFormModal(PlainAddOrEditForm);
const DG=datagrid.create(model,AddOrEditFormModal);

export class List extends React.Component{
    render(){
        return <DG/> ;
    }
}
