import React from 'react';
import {Row,Col,message} from 'antd';
import {AddOrEditForm} from './_common/add-or-edit-form';
import {model} from './_common/model';
import {addform} from "./adminui";



const AddForm=addform.create(model,AddOrEditForm);

export class Add extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return <AddForm/>;
    }
}