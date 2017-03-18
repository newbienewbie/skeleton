import React from 'react';
import UEditor from 'simple-react-ui/dist/ueditor';
import 'whatwg-fetch';
import {Row,Col,Button,Select,Switch,Upload,message} from 'antd';
import UploadAttachment from '../../upload-attachment.jsx';
import {KeywordSelector} from '../../utils/keyword-selector.js';
import {CategorySelector} from './category-selector.jsx'; 
import './style.less';

/**
 * <AddOrEditForm url={}/>
 */
export const AddOrEditForm=React.createClass({

    getDefaultProps(){
        return {
            url:'#', // 表单的提交地址
            id:null, // 如果id可转为false，则为添加模式，否则为编辑模式
            afterInit:(ue)=>{},
        };
    },

    getInitialState(){
        return {
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
    },


    render:function () {
        return (<form id="ebookAddOrEditForm">
            <div className="title">
                <input name='title' required type='text' placeholder='标题' value={this.state.title||''} onChange={(v)=>{ this.setState({title:v.target.value}); }}/>
            </div>
            <div className="field-row">
                <div className="field">
                    <label>作者</label>
                    <input required value={this.state.author} 
                        onChange={e=>{
                            this.setState({ author:e.target.value });
                        }}
                        placeholder="作者"
                    />
                </div>
                <div className="field">
                    <label>ISBN</label>
                    <input value={this.state.isbn} 
                        onChange={e=>{
                            this.setState({ isbn:e.target.value });
                        }}
                        placeholder="请尽量提供ISBN"
                    />
                </div>
            </div>
            <div className="category-selector">
                <label>选择分类</label>
                <CategorySelector value={this.state.categoryId} onChange={(value)=>{this.setState({categoryId:value});}} />
            </div>

            <div className="multi-fields">
                <div>
                    <div className="keyword">
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
                    <div className="upload-ebok">
                        <label>上传书籍</label>
                        <UploadAttachment  action="/ueditor/controller?action=uploadfile"
                            onChange={(fileList) => {
                                if (fileList && fileList[0].response && fileList[0].response.url) {
                                    const url=fileList[0].response.url;
                                    this.setState({ url}, () => {
                                        console.log(`附件更新：${this.state.url}`)
                                    });
                                }
                            }}
                        />
                    </div>
                </div>
                <div className="feature-image">
                    <label>特色图片</label>
                    <UploadAttachment  action="/ueditor/controller?action=uploadimage"
                        onChange={(fileList) => {
                            if (fileList && fileList[0].response && fileList[0].response.url) {
                                const posterUrl=fileList[0].response.url;
                                this.setState({ posterUrl }, () => {
                                    console.log(`附件更新：${this.state.posterUrl}`)
                                });
                            }
                        }}
                    />
                    <img src={this.state.posterUrl} height={'100%'}/>
                </div>
            </div> 

            <UEditor id="ueditorContainer" name="content" 
                width={800} height={200}
                afterInit={(ue)=>{
                    const id=this.props.id;
                    if(!!id){    // 当前是在编辑模式
                        // 获取最新的数据
                        fetch(`/ebook/detail?id=${id}`,{
                            method:'get',
                            credentials:'same-origin',
                        }).then(resp=>resp.json())
                        .then(info=>{
                            const state=Object.assign({},info);
                            state.keywords;
                            this.setState(state,()=>{
                                ue.setContent(info.description);
                            });
                        });
                    }else{ // 当前是新增模式
                    
                    }
                }} 
            /> 
            <Button onClick={e=>{
                e.preventDefault();
                if(!UE ||!UE.getEditor){
                    message.info(`编辑器尚未准备好，请稍后...`);
                    return;
                }
                const id=this.props.id;
                const {title,isbn,author,categoryId,keywords,posterUrl,url}=this.state;
                const description=UE.getEditor("ueditorContainer").getContent();
                if(!!!title){ message.error(`标题不得为空`); return false;}
                if(!!!categoryId){ message.error(`专栏不得为空`); return false; }
                if(!!!description){ message.error(`内容不得为空`); return false; }

                fetch(`${this.props.url}`,{
                    method:'post',
                    credentials:'same-origin',
                    headers:{
                        "Content-Type":"application/json",
                    },
                    body:JSON.stringify({ 
                        id,title,isbn,author,categoryId,
                        description,keywords,
                        posterUrl, url,
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