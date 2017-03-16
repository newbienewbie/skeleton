import React from 'react';
import UEditor from 'simple-react-ui/dist/ueditor';
import 'whatwg-fetch';
import {Row,Col,Button,Select,Switch,Upload,message} from 'antd';
import {CategorySelector} from './category-selector.jsx'; 
import {KeywordSelector} from '../../utils/keyword-selector.js';
import UploadAttachment from '../../upload-attachment.jsx';
import './style.less';

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
            keywords:[
                {id:null,postId:null,tag:''},
            ],
            commentable:true,
        };
    },


    render:function () {
        return (<form id="postAddOrEditForm">
            <div>
                <input name='title' type='text' placeholder='标题' value={this.state.title||''} onChange={(v)=>{ this.setState({title:v.target.value}); }}/>
            </div>
            <div>
                <textarea required placeholder='摘要' value={this.state.excerpt||''} onChange={(v)=>{ this.setState({excerpt:v.target.value});}} />
            </div>
            <div>
                <div>
                    <div>
                        <label>选择分类</label>
                        <CategorySelector value={this.state.categoryId} onChange={(value)=>{this.setState({categoryId:value});}} />
                    </div>
                    <div>
                        <label>关键词</label>
                        <KeywordSelector keywords={this.state.keywords} 
                            onChange={(list)=>{
                                const keywords=list.map((kw,idx)=>{
                                    return { id:idx, tag:kw, };
                                });
                                this.setState({keywords});
                            }} 
                        />
                    </div>
                    <div>
                        <label>可否评论</label>
                        <Switch defaultChecked={true} onChange={(value)=>{}} />
                    </div>
                </div>
                <div>
                    <div>
                        <label>特色图片</label>
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
                    </div>
                    <img src={this.state.featureImageUrl} height={'100%'}/>
                </div>
            </div>

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

                fetch(`${this.props.url}`,{
                    method:'post',
                    credentials:'same-origin',
                    headers:{
                        "Content-Type":"application/json",
                    },
                    body:JSON.stringify({ 
                        id,title,categoryId,content, excerpt,
                        keywords:this.state.keywords,
                        commentable:this.state.commentable,
                        featureImageUrl:this.state.featureImageUrl,
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