import React from 'react';
import {Row,Col,message} from 'antd';

import {defaultDecoratedForm,datagrid} from 'tiny-admin';
import {model} from '../_common/model';

class Fake extends React.Component{
    render(){
        return <div/>;
    }
}

// mock a modal , because we don't need it
const AddOrEditModal=defaultDecoratedForm.createDecoratedAddOrEditFormModal(Fake);
const Datagrid=datagrid(model,AddOrEditModal);


export class List extends React.Component{

    constructor(props){
        super(props);
        this.state={
            id:'',
            record:{},
        };
    }


    render(){
        return (<div>
            <Datagrid 
                onRowClick={(record,index)=>{ 
                    this.setState({
                        id:record.id,
                        record
                    }); 
                }} 
            />
        </div>);
    }
}


export default List;