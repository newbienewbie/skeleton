import React from 'react';
import {Row,Col,message} from 'antd';
import {AddOrEditForm} from './_common/add-or-edit-form';
import {model} from './_common/model';


export class Add extends React.Component{
    constructor(props){
        super(props);
        this.formRef=null;
    }

    render() {
        return (<div>
            <AddOrEditForm ref={form=>this.formRef=form} onOk={_=>{
                this.formRef.validateFields((err,value)=>{
                    if(!err){
                        model.methods.create(value)
                            .then(resp=>{
                                message.success(`创建成功`);
                                this.formRef.resetFields();
                            })
                            .catch(e=>{
                                message.error(`失败`+e);
                            });
                    }
                });
            }} />
        </div>);
    }
}