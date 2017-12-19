import React from 'react';
import {Button,Upload,message} from 'antd';
import {fixControlledValue} from './helper';


/**
 * 对antd的<Upload/>做了封装，主要是两个功能：
 *     1. 可以通过`props.limit`限定数量；
 *     2. 可以配合`ueditor`后端使用，对 file.response 作了适配。
 * 分为受控模式、非受控模式。
 */
export class UploadAttachment extends React.Component{

    constructor(props){
        super(props);
        this.state={
            fileList:this.props.fileList||[
                /*{
                    uid: 1,
                    name: 'xxx.png',
                    url: 'http://www.baidu.com/xxx.png',
                    status: 'done',
                    reponse: 'Server Error 500', // custom error message to show
                }*/
            ],
        };
    }

    normalizeFileList(list=[]){
        const fileList=list.slice(-1*this.props.limit)
            // 设置每一项的url
            .map((file) => {
                // 组件会将 file.url 作为链接进行展示
                if (file.response) { file.url = file.response.url; }
                return file;
            })
            // 筛出其中上传成功的
            .filter((file) => {
                // if (file.response) {
                //     return file.status=='error' || file.response.state === 'SUCCESS';
                // }
                return true;
            });
        return fileList;
    }

    isListSame(list1,list2){
        const _list2=JSON.parse(JSON.stringify(list2));
        let item1;
        let item2;
        let found=false;
        for(let i=0;i<list1.length;i++){
            item1=list1[i];
            for(let j=0;j<list2.length;j++){
                found=false;
                item2=list2[2];
                if(item1.url==item2.url && !item2.flag){
                    item2['flag']=true;
                    found=true;
                    break;
                }
                if(!found){ return false; }
            }
        }
        return false;
    }


    componentWillReceiveProps(nextProps){
        if('fileList' in nextProps){
            const nextValue=fixControlledValue(nextProps.fileList);
            const thisValue=fixControlledValue(this.props.fileList);
            // 如果下一个value值和现在的value值相同，则不再同步。
            if(this.isListSame(nextProps,thisValue)){
                return;
            }
            this.setState({ value:nextValue });
        }
    }

    render(){
        return (<Upload name='upfile' 
            action={this.props.action} listType={this.props.listType}
            showUploadList={this.props.showUploadList}
            withCredentials={this.props.withCredentials}
            fileList={this.state.fileList}
            onChange={(info)=>{
                // 1. 上传列表数量的限制
                // 2. 读取远程路径并显示链接
                // 3. 按照服务器返回信息筛选成功上传的文件
                let fileList = this.normalizeFileList(info.fileList);
                this.setState({ fileList }, () => {
                    this.props.onChange(fileList);
                });
            }} 
            >
            <Button type="primary">{this.props.tag}</Button>
        </Upload>);
    }
}

UploadAttachment.defaultProps={
    action:'',
    listType:'picture',
    limit:1,
    tag:'点击上传',
    showUploadList:true,
    withCredentials:true,
};

export default UploadAttachment;