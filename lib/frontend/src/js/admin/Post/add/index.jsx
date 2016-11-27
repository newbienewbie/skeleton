import React from 'react';
import UEditor from 'simple-react-ui/dist/ueditor';
import 'whatwg-fetch';
import {message} from 'antd';

const Add=React.createClass({

    getInitialState(){
        return {
            title:'',
            colId:'',
        };
    },

    render:function () {

        return (<div className="col-sm-9 col-sm-offset-3 col-md-8 col-md-offset-2 main">
            <form action="" method='post' className="container" >
                <input name='title' onChange={(v)=>{
                    this.setState({title:v.target.value});
                }}/>
                <input name="colId" onChange={(v)=>{
                    this.setState({colId:v.target.value});
                }}/>
                <UEditor id="ueditorContainer" name="content" 
                    initialContent={""} 
                    width={800} height={500} 
                /> 
                <input className="btn btn-warning" type='submit' name="提交" value='提交' onClick={e=>{
                    e.preventDefault();
                    if(!!!UE ||!!!UE.getEditor){
                        message.info(`编辑器尚未准备好，请稍后...`);
                        return;
                    }
                    const title=this.state.title;
                    const colId=this.state.colId;
                    const ue=UE.getEditor("ueditorContainer");
                    const content=ue.getContent();
                    if(!!!title){ message.error(`标题不得为空`);}
                    if(!!!colId){ message.error(`专栏不得为空`);}
                    if(!!!content){ message.error(`内容不得为空`); }

                    fetch("/post/new",{
                        method:'post',
                        credentials:'same-origin',
                        headers:{
                            "Content-Type":"application/json",
                        },
                        body:JSON.stringify({ title, colId,content, })
                    })
                    .then(info=>info.json())
                    .then((info)=>{
                        if(info.status=="SUCCESS"){
                            console.log(info);
                            message.info(`添加文章成功！`);
                        }
                        else{ 
                            console.log(info);
                            message.error(`添加文章失败！`);
                        }
                    })
                }}/>
            </form>
        </div>);
    }
});


export default Add;