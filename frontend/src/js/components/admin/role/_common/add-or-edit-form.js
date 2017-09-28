import React from 'React';
import {Form,message,Input,Button,Modal} from 'antd';


class PlainAddOrEditForm extends React.Component{
    constructor(props){
        super(props);
    }


    render(){
        const {getFieldDecorator,getFieldsError, getFieldError, isFieldTouched,validateFields}=this.props.form;
        const hasFieldError=(fieldname)=>isFieldTouched(fieldname) && getFieldError(fieldname);
        const hasErrors=(fieldsError)=>Object.keys(fieldsError).some(field => fieldsError[field]);
        const FormItem=Form.Item;
        return (
        <Form >
            <FormItem label='角色名' validateStatus={hasFieldError('name')} help={hasFieldError('name')||''} >
            {
                getFieldDecorator('name',{
                    rules:[{required:true,message:'角色名必填'}],
                    initialValue:this.props.initialValues.name,
                })(
                    <Input placeholder='角色名' />
                )
            }
            </FormItem>
        
            <FormItem label='描述' validateStatus={hasFieldError('description')} help={hasFieldError('description')||''} >
            {
                getFieldDecorator('description',{
                    rules:[{required:true,message:'角色描述必填'}],
                    initialValue:this.props.initialValues.description,
                })(
                    <Input placeholder='description' />
                )
            }
            </FormItem>
        
        </Form>);
        
    }
}

PlainAddOrEditForm.defaultProps={
    initialValues:{
        name:'',
        description:'',
    },
};


class PlainAddOrEditFormWithSubmitButton extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return <div>
            <PlainAddOrEditForm form={this.props.form} initialValues={this.props.initialValues}/>
            <Button htmlType="submit" type="primary" onClick={this.props.onOk}> 提交 </Button>
        </div>;
    }
}

class PlainAddOrEditFormWithModal extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return <Modal title="Title" okText="提交" cancelText="取消"
            visible={this.props.visible} data={this.props.data}
            onOk={this.props.onOk} onCancel={this.props.onCancel}
        >
            <PlainAddOrEditForm form={this.props.form} initialValues={this.props.initialValues} />
        </Modal>
        ;
    }
}

export const AddOrEditForm=Form.create()(PlainAddOrEditFormWithSubmitButton);
export const AddOrEditFormModal=Form.create()(PlainAddOrEditFormWithModal);