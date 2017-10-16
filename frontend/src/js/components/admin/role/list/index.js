import React from 'react';
import {Row,Col,Button,Table,Modal,Popconfirm,message} from 'antd';
import {MainDetailAdmin} from './main-detail';

export class List extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        return <div> 
            <MainDetailAdmin/>
        </div> ;
    }
}
