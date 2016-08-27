import React from 'react';
import 'whatwg-fetch'; 
import {Button,Upload,message} from 'antd';

/**
 * 上传附件
 */
const UploadAttachment=React.createClass({

    getDefaultProps:function(){
        return {
            action:'',
            callback:()=>{},
            multi:false,
        };
    },

    getInitialState:function(){
        return {
            fileList: [],
        };
    },

    render:function(){
        return (<Upload name='upfile' 
            action={this.props.action}
            fileList={this.state.fileList}
            onChange={(info)=>{
                if(this.props.multi){
                    this.props.onChange(info);
                }else{
                    let fileList=info.fileList;
                    // 1. 上传列表数量的限制
                    //   只显示最近上传的一个，旧的会被新的顶掉
                    fileList = fileList.slice(-1);

                    // 2. 读取远程路径并显示链接
                    fileList = fileList.map((file) => {
                        if (file.response) {
                            // 组件会将 file.url 作为链接进行展示
                            file.url = file.response.url;
                        }
                        return file;
                    });

                    // 3. 按照服务器返回信息筛选成功上传的文件
                    fileList = fileList.filter((file) => {
                        if (file.response) {
                            return file.response.state=== 'SUCCESS';
                        }
                        return true;
                    });
                    this.setState({fileList},(fileList)=>{
                        this.props.onChange(fileList);
                    });
                }
            }} 
            >
            <Button type="primary">点击上传</Button>
        </Upload>);
    }
});

export default UploadAttachment;