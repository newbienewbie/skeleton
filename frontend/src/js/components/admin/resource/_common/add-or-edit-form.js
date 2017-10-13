import React from 'react';
import {Form,Button,Input,Select,message} from 'antd';


const createSelectCategory=function(opts){
    class SelectCategory extends React.Component{
        constructor(props){
            super(props);
        }

        render(){
            return <Select style={{ width: 120 }}>
                <Select.Option value="2">z</Select.Option>
                <Select.Option value="3">y</Select.Option>
                <Select.Option value="1">x</Select.Option>
                <Select.Option value="5">k</Select.Option>
            </Select>;
        }
    }
    return SelectCategory;
};

const SelectCategory=createSelectCategory();


export class PlainAddOrEditForm extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        const FormItem=Form.Item;
        const {getFieldDecorator,getFieldsError, getFieldError, isFieldTouched,validateFields}=this.props.form;
        const hasFieldError=(fieldname)=>isFieldTouched(fieldname) && getFieldError(fieldname);
        const hasErrors=(fieldsError)=>Object.keys(fieldsError).some(field => fieldsError[field]);


        return (
        <Form layout="horziontal" onSubmit={e=>{
            e.preventDefault();
            validateFields((err, values) => {
                if (!err) {
                    console.log(values);
                }
            });
        }}>

            <FormItem label='分类' validateStatus={hasFieldError('categoryId')} help={hasFieldError('categoryId')||''} >
            {
                getFieldDecorator('categoryId',{
                    rules:[{required:true,message:'category required'}],
                    initialValue:this.props.initialValues.categoryId,
                })(
                    <Input />
                )
            }
            </FormItem>

            <FormItem label='名称' validateStatus={hasFieldError('name')} help={hasFieldError('name')||''} >
            {
                getFieldDecorator('name',{
                    rules:[{required:true,message:'name required'}],
                    initialValue:this.props.initialValues.name,
                })(
                    <Input placeholder='error' />
                )
            }
            </FormItem>

            <FormItem label='描述' validateStatus={hasFieldError('description')} help={hasFieldError('description')||''} >
            {
                getFieldDecorator('description',{
                    rules:[{required:true,message:'description required'}],
                    initialValue:this.props.initialValues.description,
                })(
                    <Input placeholder='error' />
                )
            }
            </FormItem>

            <FormItem label='请求方法' validateStatus={hasFieldError('method')} help={hasFieldError('method')||''} >
            {
                getFieldDecorator('method',{
                    rules:[{required:true,message:'method required'}],
                    initialValue:this.props.initialValues.method,
                })(
                    <Select style={{ width: 120 }}>
                        <Select.Option value="GET">GET</Select.Option>
                        <Select.Option value="POST">POST</Select.Option>
                        <Select.Option value="PUT">PUT</Select.Option>
                        <Select.Option value="DELETE">DELETE</Select.Option>
                    </Select>
                )
            }
            </FormItem>

            <FormItem label='路径' validateStatus={hasFieldError('path')} help={hasFieldError('path')||''} >
            {
                getFieldDecorator('path',{
                    rules:[{required:true,message:'path required'}],
                    initialValue:this.props.initialValues.path,
                })(
                    <Input placeholder='error' />
                )
            }
            </FormItem>

        </Form>);

    }
}


PlainAddOrEditForm.defaultProps={
    initialValues:{
        categoryId:'',
        name:'',
        description:'',
        method:'',
        path:'',
    },
};
