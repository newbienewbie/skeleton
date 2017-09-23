import React from 'React';
import {Form,message,Input,Button} from 'antd';


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
        <Form onSubmit={e=>{
            e.preventDefault();
            validateFields((err, values) => {
                if (!err) {
                    console.log(values);
                    console.log(this.props.url);
                }
            });
        }}>
            <FormItem label='角色名' validateStatus={hasFieldError('name')} help={hasFieldError('name')||''} >
            {
                getFieldDecorator('name',{
                    rules:[{required:true,message:'角色名必填'}],
                })(
                    <Input placeholder='角色名' />
                )
            }
            </FormItem>
        
            <FormItem label='描述' validateStatus={hasFieldError('description')} help={hasFieldError('description')||''} >
            {
                getFieldDecorator('description',{
                    rules:[{required:true,message:'角色描述必填'}],
                })(
                    <Input placeholder='description' />
                )
            }
            </FormItem>
        
            <FormItem>
                <Button htmlType='submit' type="primary" size="large" disabled={hasErrors(getFieldsError())}>Submit</Button>
            </FormItem>
        </Form>);
        
    }
}

PlainAddOrEditForm.defaultProps={
};

export const AddOrEditForm=Form.create()(PlainAddOrEditForm);