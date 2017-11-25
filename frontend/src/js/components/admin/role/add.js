import React from 'react';
import {Row,Col,message} from 'antd';
import {PlainAddOrEditForm} from './_common/add-or-edit-form';
import {model} from './_common/model';
import {decorateAddOrEditForm,addform} from 'tiny-admin';



const AddOrEditForm=decorateAddOrEditForm(PlainAddOrEditForm);
const AddForm=addform(model,AddOrEditForm);

export class Add extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return <AddForm/>;
    }
}