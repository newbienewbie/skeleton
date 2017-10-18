import React from 'react';
import {Card,Button,Modal,message} from 'antd';
import RoleManager from './role-manager.jsx';



/**
 * 重置密码
 */
export class PasswordManager extends React.Component{

    constructor(props){
        super(props);
        this.state={ };
    }

    render(){
        return (<Card title={this.props.title} bordered={this.props.bordered} >

            <div>
                当前角色名：{this.props.record.username}
            </div>

            <Button style={{ color:'white', backgroundColor:'red'}} onClick={()=>{
                Modal.confirm({
                    title:'请确认',
                    content:'真要重置密码吗？',
                    onOk:()=>{message.error('此功能敬请期待');},
                    onCancel:()=>{},
                })
            }} >
                重置密码
            </Button>

        </Card>);
    }
}

PasswordManager.defaultProps= {
    record:[],
    title:'密码管理',
    bordered:true,
};

export default PasswordManager;
