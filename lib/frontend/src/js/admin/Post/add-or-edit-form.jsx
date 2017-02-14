import React from 'react';
import UEditor from 'simple-react-ui/dist/ueditor';
import 'whatwg-fetch';
import {Row,Col,Button,message} from 'antd';


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
        };
    },

    render:function () {
        return (<form>
            <input name='title' onChange={(v)=>{ this.setState({title:v.target.value}); }}/>
            <input name="categoryId" onChange={(v)=>{ this.setState({categoryId:v.target.value}); }}/>
            <UEditor id="ueditorContainer" name="content" 
                initialContent={this.props.initialContent} width={800} height={500} 
                afterInit={this.props.afterInit}
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