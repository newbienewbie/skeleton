import React from 'react';
import UEditor from 'simple-react-ui/dist/ueditor';
import 'whatwg-fetch';
import {Row,Col,Button,Select,Switch,Upload,message} from 'antd';
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
            afterInit:()=>{},
        };
    },

    getInitialState(){
        return {
            title:'',
            posterUrl:'#',
            isbn:'',
            featureImageUrl:'#',
            ebookUrl:'#',
        };
    },


    render:function () {
        return (<form id="postAddOrEditForm">
            <div>
                <input name='title' type='text' placeholder='标题' value={this.state.title||''} onChange={(v)=>{ this.setState({title:v.target.value}); }}/>
            </div>
            <div>
                <label>ISBN</label>
                <input value={this.state.isbn} onChange={e=>{
                        this.setState({ isbn:e.target.value });
                    }}
                    placeholder="请尽量提供ISBN"
                />
            </div>
            <div>
                <div>
                    <label>上传书籍</label>
                    <UploadAttachment  action="/ueditor/controller?action=uploadfile"
                        onChange={(fileList) => {
                            if (fileList && fileList[0].response && fileList[0].response.url) {
                                const ebookUrl=fileList[0].response.url;
                                this.setState({ ebookUrl}, () => {
                                    console.log(`附件更新：${this.state.ebookUrl}`)
                                });
                            }
                        }}
                    />
                </div>
                <div>
                    <label>特色图片</label>
                    <UploadAttachment  action="/ueditor/controller?action=uploadimage"
                        onChange={(fileList) => {
                            if (fileList && fileList[0].response && fileList[0].response.url) {
                                const featureImageUrl=fileList[0].response.url;
                                this.setState({ featureImageUrl }, () => {
                                    console.log(`附件更新：${this.state.featureImageUrl}`)
                                });
                            }
                        }}
                    />
                    <img src={this.state.featureImageUrl} height={'100%'}/>
                </div>
            </div> 

            <UEditor id="ueditorContainer" name="content" 
                afterInit={(ue)=>{
                    const id=this.props.id;
                    if(!!id){    // 编辑已有文章的表单
                        // 获取最新的数据
                        fetch(`/ebook/detail?id=${id}`,{
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
                if(!UE ||!UE.getEditor){
                    message.info(`编辑器尚未准备好，请稍后...`);
                    return;
                }
            }}>提交
            </Button>
        </form>);
    }
});


export default AddOrEditForm;