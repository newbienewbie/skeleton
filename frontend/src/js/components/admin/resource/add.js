import React from 'react';
import {Row,Col,message} from 'antd';
import {PlainAddOrEditForm} from './_common/add-or-edit-form';
import {model} from './_common/model';
import {defaultDecoratedForm,addform} from 'tiny-admin';



const AddOrEditForm=defaultDecoratedForm.createDecoratedAddOrEditForm(PlainAddOrEditForm);
const AddForm=addform.create(model,AddOrEditForm);

export class Add extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return <AddForm/>;
    }
}