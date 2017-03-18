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
            limit:1,
            tag:'点击上传',
            showUploadList:true,
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
            showUploadList={this.props.showUploadList}
            fileList={this.state.fileList}
            onChange={(info)=>{
                // 1. 上传列表数量的限制
                // 2. 读取远程路径并显示链接
                // 3. 按照服务器返回信息筛选成功上传的文件
                let fileList = info.fileList.slice(-1*this.props.limit)
                    .map((file) => {
                        if (file.response) {
                            // 组件会将 file.url 作为链接进行展示
                            file.url = file.response.url;
                        }
                        return file;
                    })
                    .filter((file) => {
                        if (file.response) {
                            return file.response.state === 'SUCCESS';
                        }
                        return true;
                    });

                this.setState({ fileList }, () => {
                    this.props.onChange(fileList);
                });
            }} 
            >
            <Button type="primary">{this.props.tag}</Button>
        </Upload>);
    }
});

export default UploadAttachment;