import React from 'react';
import {Row,Col,Button} from 'antd';
import {Link} from 'react-router';

export class ToolBar extends React.Component{

    constructor(props){
        super(props);
    }

    getRoleAuthorToolBar(){
        return (<Row>
            <Col span={6}>
                <Button onClick={this.props.onPreview}>预览</Button>
            </Col>
            <Col span={6}>
                <Link to={ {pathname:`/post/edit/${this.props.postId}`,state:this.props.record }} >编辑</Link>
            </Col>
            <Col span={6}>
                <Button onClick={this.props.onPublish}>发表</Button>
            </Col>
            <Col span={6}>
                <Button  onClick={this.props.onRemove}>删除</Button>
            </Col>
        </Row>);
    }
    
    getRoleCensorToolBar(){
        return (<Row>
            <Col span={6}>
                <Button onClick={this.props.onPreview}>预览</Button>
            </Col>
            <Col span={6}>
                <Button onClick={this.props.onApproval}>审核通过</Button>
            </Col>
            <Col span={6}>
                <Button onClick={this.props.onSendback}>审核退回</Button>
            </Col>
            <Col span={6}>
                <Button onClick={this.props.onReject}>审核拒绝</Button>
            </Col>
        </Row>);
    }

    getToolBar(){
        let toolbar={};
        switch(this.props.job){
            case 'author':
                toolbar=this.getRoleAuthorToolBar();
                break;
            case 'censor':
                toolbar=this.getRoleCensorToolBar();
                break;
            default:
                toolbar=this.getRoleAuthorToolBar(); 
        }
        return toolbar;
    }

    render(){
        return (<div>
            {this.getToolBar()}
        </div>);
    }
}

ToolBar.defaultProps={
    postId:null,
    job:'',
    onPreview:function(){ },
    onEdit:function(){ },
    onPublish:function(){},
    onRemove:function(){},
    onApproval:function(){},
    onSendback:function(){},
    onReject:function(){},
};


export default ToolBar;