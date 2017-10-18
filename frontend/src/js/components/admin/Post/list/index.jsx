import React from 'react';
import {Row,Col} from 'antd';
import 'whatwg-fetch';
import {PostManager} from './post-manager.jsx';

import {defaultDecoratedForm,datagrid} from 'tiny-admin';
import {PlainAddOrEditForm} from '../_common/add-or-edit-form';
import {model} from '../_common/model';


const AddOrEditModal=defaultDecoratedForm.createDecoratedAddOrEditFormModal(PlainAddOrEditForm);
const Datagrid=datagrid(model,AddOrEditModal);


export class List extends React.Component{

    constructor(props){
        super(props);
        this.state={
            postId:'',
            record:{},
            refreshCode:1
        };
    }


    render(){
        return (<div>
            <Datagrid onRowClick={(record,index)=>{ this.setState({postId:record.id,record}); }} />
            <PostManager job={this.props.job} postId={this.state.postId} record={this.state.record}
                afterOperation={()=>{ }}
            />
        </div>);
    }
}

List.defaultProps={
    job:'author',
};

export default List;