import React from 'react';
import UEditor from 'simple-react-ui/dist/ueditor';
import 'whatwg-fetch';
import {Row,Col,Button,Select,Upload,message} from 'antd';
import {CategorySelector} from './category-selector.jsx'; 
import UploadAttachment from '../../upload-attachment.jsx';

/**
 * <AddOrEditForm url={}/>
 */
export const AddOrEditForm=React.createClass({

    getDefaultProps(){
        return {
            url:'#',
            id:null, // 如果可转为false，则为添加模式，否则为编辑模式
            initialContent:'',
            afterInit:()=>{},
        };
    },

    getInitialState(){
        return {
            title:'',
            categoryId:'',
            featureImageUrl:'#',
        };
    },



    render:function () {
        return (<form>
            <Row>
                <Col span={24}>
                    <input name='title' type='text' placeholder='标题' value={this.state.title||''} onChange={(v)=>{ this.setState({title:v.target.value}); }} style={{display:'block',width:'800',marginBottom:'10'}}/>
                </Col>
            </Row>
            <Row>
                <Col span={8}>
                    <Row>
                        <Col span={8}>
                            <label>选择分类</label>
                        </Col>
                        <Col span={8}>
                            <CategorySelector value={this.state.categoryId} onChange={(value)=>{this.setState({categoryId:value});}} />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                            <label>阅读密码</label>
                        </Col>
                        <Col span={8}>
                            <label>阅读密码</label>
                        </Col>
                    </Row>
                </Col>
                <Col span={4}>
                    <Row>
                        <label>特色图片</label>
                    </Row>
                    <Row>
                        <UploadAttachment  action="/upload/meiying/image?action=uploadimage"
                            onChange={(fileList) => {
                                if (fileList && fileList[0].response && fileList[0].response.url) {
                                    const featureImageUrl=fileList[0].response.url;
                                    this.setState({ featureImageUrl }, () => {
                                        console.log(`附件更新：${this.state.featureImageUrl}`)
                                    });
                                }
                            }}
                        />
                    </Row>
                </Col>
                <Col span={8}>
                    <img src={this.state.featureImageUrl} alt={'特色图片'} width={'200px'} height={'134px'}/>
                </Col>
            </Row>
            <UEditor id="ueditorContainer" name="content" 
                initialContent={this.props.initialContent} width={800} height={500} 
                afterInit={(ue)=>{
                    const id=this.props.id;
                    if(!!id){    // 编辑已有文章的表单
                        // 获取最新的数据
                        fetch(`/post/detail?id=${id}`,{
                            method:'get',
                            credentials:'same-origin',
                        }).then(resp=>resp.json())
                        .then(info=>{
                            this.setState({title:info.title,categoryId:info.categoryId});
                            return ue.setContent(info.content);
                        });
                    }else{ // 新增文章的表单
                    }
                }} 
            /> 
            <Button onClick={e=>{
                e.preventDefault();
                if(!!!UE ||!!!UE.getEditor){
                    message.info(`编辑器尚未准备好，请稍后...`);
                    return;
                }
                const id=this.props.id;
                const title=this.state.title;
                const categoryId=this.state.categoryId;
                const ue=UE.getEditor("ueditorContainer");
                const content=ue.getContent();
                if(!!!title){ message.error(`标题不得为空`);}
                if(!!!categoryId){ message.error(`专栏不得为空`);}
                if(!!!content){ message.error(`内容不得为空`); }

                fetch(`${this.props.url}`,{
                    method:'post',
                    credentials:'same-origin',
                    headers:{
                        "Content-Type":"application/json",
                    },
                    body:JSON.stringify({ 
                        id,title,categoryId,content, 
                    })
                })
                .then(info=>info.json())
                .then((info)=>{
                    if(info.status=="SUCCESS"){
                        console.log(info);
                        message.info(`添加文章成功！`);
                        ue.setContent('');
                    }
                    else{ 
                        console.log(info);
                        message.error(`添加文章失败！`);
                    }
                });
            }}>提交
            </Button>
        </form>);
    }
});


export default AddOrEditForm;