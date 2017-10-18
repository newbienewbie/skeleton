import React from 'react';
import {Row,Col} from 'antd';
import {Manager} from './manager.jsx';

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
            ebookId:'',
            refreshCode:1
        };
    }

    render(){
        return (<div>
            <Datagrid onRowClick={(record,index)=>{ this.setState({ebookId:record.id}); }} />
            <Manager job={this.props.job} id={this.state.ebookId} 
                afterOperation={()=>{
                    const that=this;
                    return new Promise(function(resolve,reject){
                        that.setState(
                            {refreshCode:that.state.refreshCode+1},
                            function(){ resolve(); }
                        );
                    });
                }}
            />
        </div>);
    }
}

List.defaultProps={
    job:'author',
};


export default List;