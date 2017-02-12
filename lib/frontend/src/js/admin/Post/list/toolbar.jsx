import React from 'react';
import {Row,Col,Button} from 'antd';

export const ToolBar=React.createClass({

    getDefaultProps:function(){
        return {
            job:'',
            onPreview:function(){ },
            onEdit:function(){ },
            onSubmit:function(){},
            onRemove:function(){},
            onApproval:function(){},
            onSendback:function(){},
            onReject:function(){},
        };
    },

    getRoleAuthorToolBar:function(){
        return (<Row>
            <Col span={6}>
                <Button onClick={this.props.onPreview}>预览</Button>
            </Col>
            <Col span={6}>
                <Button onClick={this.props.onEdit}>修改</Button>
            </Col>
            <Col span={6}>
                <Button onClick={this.props.onSubmit}>提交</Button>
            </Col>
            <Col span={6}>
                <Button  onClick={this.props.onRemove}>删除</Button>
            </Col>
        </Row>);
    },
    
    getRoleCensorToolBar:function(){
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
    },

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
    },

    render:function(){
        return (<div>
            {this.getToolBar()}
        </div>);
    }
});


export default ToolBar;