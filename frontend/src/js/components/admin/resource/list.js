import React from 'react';
import {Row,Col,Button,Table,Modal,Popconfirm,message} from 'antd';
import {PlainAddOrEditForm} from './_common/add-or-edit-form';
import {model} from './_common/model';
import {defaultDecoratedForm,datagrid} from 'tiny-admin';


const AddOrEditFormModal=defaultDecoratedForm.createDecoratedAddOrEditFormModal(PlainAddOrEditForm);
const DG=datagrid(model,AddOrEditFormModal);

export class List extends React.Component{
    render(){
        return <DG onRowClick={_=>{
            console.log(_);
        }}/> ;
    }
}
