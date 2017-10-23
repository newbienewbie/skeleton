import React from 'react';
import UEditor from 'simple-react-ui/dist/ueditor';
import {Row,Col,Form,Button,Icon,Input,Select,Switch,Upload,message} from 'antd';
import {CategorySelector} from '../../utils/category-selector'; 
import {KeywordSelector} from '../../utils/keyword-selector';
import {UploadAttachment} from '../../utils/upload-attachment';
import './style.less';

/**
 * <AddOrEditForm url={}/>
 */
export class PlainAddOrEditForm extends React.Component{

    constructor(props){
        super(props);
    }

    render() {

        const FormItem=Form.Item;
        const {getFieldDecorator,getFieldsError, getFieldError, isFieldTouched,validateFields}=this.props.form;
        const hasFieldError=(fieldname)=>isFieldTouched(fieldname) && getFieldError(fieldname);
        const hasErrors=(fieldsError)=>Object.keys(fieldsError).some(field => fieldsError[field]);

        return (
            <Form onSubmit={e=>{
                e.preventDefault();
                validateFields((err, values) => {
                    if (!err) {
                        console.log(values);
                    }
                });
            }}>
                <FormItem label='标题' validateStatus={hasFieldError('title')} help={hasFieldError('title')||''} >
                {
                    getFieldDecorator('title',{
                        rules:[{required:true,message:'title required'}],
                    })(
                        <Input name='title' type='text' placeholder='标题'/>
                    )
                }
                </FormItem>
            
                <FormItem label='摘要' validateStatus={hasFieldError('excerpt')} help={hasFieldError('excerpt')||''} >
                {
                    getFieldDecorator('excerpt',{
                        rules:[{required:true,message:'excerpt required'}],
                    })(
                        <Input required placeholder='摘要' />
                    )
                }
                </FormItem>

                <FormItem label='分类' validateStatus={hasFieldError('categoryId')} help={hasFieldError('categoryId')||''} >
                {
                    getFieldDecorator('categoryId',{
                        rules:[{required:true,message:'category required'}],
                    })(
                        <CategorySelector scope={"post"} />
                    )
                }
                </FormItem>

                <FormItem label='配图' validateStatus={hasFieldError('featureImageUrl')} help={hasFieldError('featureImageUrl')||''} >
                {
                    getFieldDecorator('featureImageUrl',{
                        rules:[{required:true,message:'feature image required'}],
                        valuePropName:'fileList',
                    })(
                        <UploadAttachment tag="上传" action={"/upload/meiying/image?action=uploadimage"} listType="picture" />
                    )
                }
                </FormItem>

                <FormItem label='关键词' validateStatus={hasFieldError('keywords')} help={hasFieldError('keywords')||''} >
                {
                    getFieldDecorator('keywords',{
                        rules:[{required:true,message:'keywords required'}],
                        getValueFromEvent:e=>{
                            const keywords=e.map((kw,idx)=>{
                                return { id:idx, tag:kw, };
                            });
                            return keywords;
                        },
                    })(
                        <KeywordSelector/>
                    )
                }
                </FormItem>

                <FormItem label='content' validateStatus={hasFieldError('content')} help={hasFieldError('content')||''} >
                {
                    getFieldDecorator('content',{
                        rules:[{required:true,message:'content required'}],
                    })(
                        <UEditor id="ueditorContainer" name="content" 
                            width={800} height={500} 
                            afterInit={(ue)=>{ this.ue=ue;}} 
                            onChange={content=>{
                                console.log(content);
                            }}
                    /> 
                    )
                }
                </FormItem>
  
            </Form>
        );


    }
}