import React from 'react';
import {Row,Col,Button,Table,Modal,Popconfirm,message} from 'antd';
import {listRoles,listRolesOfCurrentUser,updateRole} from '../../../api/admin';
import {PlainAddOrEditForm} from './_common/add-or-edit-form';
import {model} from './_common/model';
import {defaultDecoratedForm,datagrid} from 'tiny-admin';



export class List extends React.Component{
    render(){
        const AddOrEditFormModal=defaultDecoratedForm.createDecoratedAddOrEditFormModal(PlainAddOrEditForm);
        const DG=datagrid.create(model,AddOrEditFormModal);
        return <DG/> ;
    }
}
