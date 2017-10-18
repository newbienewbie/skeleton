import React from 'react';
import UEditor from 'simple-react-ui/dist/ueditor';
import {Row,Col,Button,Select,Switch,Upload,message} from 'antd';
import {model} from '../_common/model';
import {CategorySelector} from '../../utils/category-selector'; 
import {KeywordSelector} from '../../utils/keyword-selector.js';
import UploadAttachment from '../../utils/upload-attachment';
import './style.less';

/**
 * <AddOrEditForm url={}/>
 */
export class AddOrEditForm extends React.Component{

    constructor(props){
        super(props);
        this.state={
            title:'',
            categoryId:'',
            featureImageUrl:'#',
            keywords:[
                {id:null,postId:null,tag:''},
            ],
            commentable:true,
        };
    }


    render() {
        return (<form id="postAddOrEditForm">
            <Row>
                <input name='title' type='text' placeholder='标题' value={this.state.title||''} onChange={(v)=>{ this.setState({title:v.target.value}); }}/>
            </Row>
            <Row>
                <textarea required placeholder='摘要' value={this.state.excerpt||''} onChange={(v)=>{ this.setState({excerpt:v.target.value});}} />
            </Row>
            <Row>
                <Col span={12}>
                    <Row>
                        <Col span={8}>
                            <label>选择分类</label>
                        </Col>
                        <Col span={16}>
                            <CategorySelector value={this.state.categoryId} onChange={(value)=>{this.setState({categoryId:value});}} />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                            <label>关键词</label>
                        </Col>
                        <Col span={16}>
                            <KeywordSelector value={this.state.keywords} 
                                onChange={(list)=>{
                                    const keywords=list.map((kw,idx)=>{
                                        return { id:idx, tag:kw, };
                                    });
                                    this.setState({keywords});
                                }} 
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                            <label>可否评论</label>
                        </Col>
                        <Col span={16}>
                            <Switch defaultChecked={true} onChange={(value)=>{}} />
                        </Col>
                    </Row>
                </Col>
                <Col span={12} className="featureImage">
                    <div>
                        <UploadAttachment tag="特色图片" action="/upload/meiying/image?action=uploadimage"
                            onChange={(fileList) => {
                                if (fileList && fileList[0].url && fileList[0].status=="done") {
                                    const featureImageUrl=fileList[0].url;
                                    this.setState({ featureImageUrl }, () => {
                                        console.log(`附件更新：${this.state.featureImageUrl}`)
                                    });
                                }
                            }}
                        />
                    </div>
                    <img src={this.state.featureImageUrl} height={'100%'}/>
                </Col>
            </Row>

            <UEditor id="ueditorContainer" name="content" 
                initialContent={this.props.initialContent} width={800} height={500} 
                afterInit={(ue)=>{
                    const id=this.props.id;
                    if(!!id){    // 编辑已有文章的表单
                        // 获取最新的数据
                        return model.methods.detail(id)
                            .then(info=>{
                                const state=Object.assign({},info);
                                this.setState(state,()=>{
                                    ue.setContent(info.content);
                                });
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
                const excerpt=this.state.excerpt;
                if(!!!title){ message.error(`标题不得为空`); return false;}
                if(!!!categoryId){ message.error(`专栏不得为空`); return false; }
                if(!!!content){ message.error(`内容不得为空`); return false; }
                if(!excerpt){ message.error(`摘要不得为空`);return false;}


                const payload={ 
                    id,title,categoryId,content, excerpt,
                    keywords:this.state.keywords,
                    commentable:this.state.commentable,
                    featureImageUrl:this.state.featureImageUrl,
                };
                if(!!this.props.id){
                    console.log(payload);
                    return model.methods.update(this.props.id,payload)
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
                }else{
                    return model.methods.create(payload)
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
                }

            }}>提交
            </Button>
        </form>);
    }
}

AddOrEditForm.defaultProps={
    url:'#',
    id:null, // 如果可转为false，则为添加模式，否则为编辑模式
    initialContent:'',
    afterInit:()=>{},
};

export default AddOrEditForm;