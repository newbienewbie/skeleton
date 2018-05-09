import React from 'react';
import UEditor from 'simple-react-ui/dist/ueditor';
import {Row,Col,Button,Select,Switch,Upload,message} from 'antd';
import {KeywordSelector} from '../../utils/keyword-selector.js';
import {CategorySelector} from '../../utils/category-selector'; 
import {UploadAttachment} from '../../utils/upload-attachment';
import {model} from '../_common/model';
import './style.less';

/**
 * <AddOrEditForm url={}/>
 */
export class AddOrEditForm extends React.Component{

    constructor(props){
        super(props);
        this.state={
            title:'',
            isbn:'',
            author:'',
            posterUrl:'#',
            url:'',
            note:'',
            categoryId:'',
            keywords:[
                {id:null,ebokId:null,tag:''},
            ],
            description:'',
        };
    }


    _renderUploadFile(){
        if(this.props.id){
            return <a href={this.state.url}>{this.state.title}</a>
        }else{
            return "";
        }
    }


    render() {
        return (<form id="ebookAddOrEditForm">
            <Row className="title">
                <input name='title' required type='text' placeholder='标题' value={this.state.title||''} onChange={(v)=>{ this.setState({title:v.target.value}); }}/>
            </Row>
            <Row className="field-row">
                <Col span={12}>
                    <Col span={8}>
                        <label>作者</label>
                    </Col>
                    <Col span={16}>
                        <input required value={this.state.author} 
                            onChange={e=>{
                                this.setState({ author:e.target.value });
                            }}
                            placeholder="作者"
                        />
                    </Col>
                </Col>
                <Col span={12}>
                    <Col span={8}>
                        <label>ISBN</label>
                    </Col>
                    <Col span={16}>
                        <input value={this.state.isbn} 
                            onChange={e=>{
                                this.setState({ isbn:e.target.value });
                            }}
                            placeholder="请尽量提供ISBN"
                        />
                    </Col>
                </Col>
            </Row>
            <Row >
                <Col span={12}>
                    <Row>
                        <Col span={8}>
                            <label>选择分类</label>
                        </Col>
                        <Col span={16}>
                            <CategorySelector scope="ebook" value={this.state.categoryId} onChange={(value)=>{this.setState({categoryId:value});}} />
                        </Col>
                    </Row>
                </Col>
            </Row>

            <Row>
                <Col span={12}>
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
                    <Row >
                        <UploadAttachment tag="上传书籍"  action="/ueditor/controller?action=uploadfile"
                            listType=""
                            onChange={(fileList) => {
                                if (fileList && fileList[0].status=="done" && fileList[0].url) {
                                    const url=fileList[0].url;
                                    this.setState({ url}, () => {
                                        console.log(`附件更新：${this.state.url}`)
                                    });
                                }
                            }}
                        />
                        { this._renderUploadFile() }
                    </Row>
                </Col>
                <Col span={8} className="feature-image">
                    <UploadAttachment tag="特色图片"  action="/ueditor/controller?action=uploadimage"
                        listType="picture" showUploadList={false}
                        onChange={(fileList) => {
                            if (fileList && fileList[0].status=="done" && fileList[0].url) {
                                const posterUrl=fileList[0].url;
                                this.setState({ posterUrl }, () => {
                                    console.log(`附件更新：${this.state.posterUrl}`)
                                });
                            }
                        }}
                    />
                    <img src={this.state.posterUrl} height={'100%'}/>
                </Col>
            </Row> 

            <UEditor id="ueditorContainer" name="content" 
                width={800} height={200}
                afterInit={(ue)=>{
                    const id=this.props.id;
                    if(!!id){    // 当前是在编辑模式
                        // 获取最新的数据
                        return model.methods.detail(id)
                        .then(info=>{
                            const state=Object.assign({},info);
                            state.keywords;
                            this.setState(state,()=>{
                                ue.setContent(info.description);
                            });
                        });
                    }else{ /*当前是新增模式*/ }
                }} 
                value={this.state.description}
                onChange={content=>{
                    this.setState({description:content});
                }}
            /> 
            <Button onClick={e=>{
                e.preventDefault();
                if(!UE ||!UE.getEditor){
                    message.info(`编辑器尚未准备好，请稍后...`);
                    return;
                }
                const id=this.props.id;
                const {title,isbn,author,categoryId,keywords,posterUrl,url,description}=this.state;
                const ue=UE.getEditor("ueditorContainer");
                if(!!!title){ message.error(`标题不得为空`); return false;}
                if(!!!categoryId){ message.error(`专栏不得为空`); return false; }
                if(!!!description){ message.error(`内容不得为空`); return false; }

                const payload={
                    id,title,isbn,author,categoryId,
                    description,keywords,
                    posterUrl, url,
                };
                if(!!id){
                    return model.methods.update(id,payload)
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
    url:'#', // 表单的提交地址
    id:null, // 如果id可转为false，则为添加模式，否则为编辑模式
    afterInit:(ue)=>{},
};


export default AddOrEditForm;