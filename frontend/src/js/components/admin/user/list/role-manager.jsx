import React from 'react';
import {Card,Transfer,Button,message} from 'antd';
import {listRolesOfCurrentUser,updateRolesOfUsername,roleapi} from '../../../../api/admin';


/**
 * 角色管理
 */
export class RoleManager extends React.Component{

    constructor(props){
        super(props);
        this.state={
            dataSource:[],
            targetKeys:[],
            onChange:()=>{},
        };
    }

    fetchAllRoles(){
        return listRolesOfCurrentUser().then(result=>{
            const count=result.count;
            const roles=result.rows;
            this.setState({
                dataSource:roles.map(r=>{
                    return {
                        key:r.id,
                        id:r.id,
                        title:r.name,
                        description:r.description,
                    };
                }),
            });
        });
    }

    componentDidMount(){
        this.fetchAllRoles();
    }

    /**
     * 当收到属性时，
     *     1. 更新当前用户对应的targetKeys：载入新属性中的记录的roles 到当前state
     *     2. 重置dataSource
     */
    componentWillReceiveProps(nextProps){
        if(nextProps.record.username==this.props.record.username){
            return;
        }else{
            let roles=nextProps.record.roles;
            let targetKeys= roles.map(r=>r.id);
            return this.fetchAllRoles()
                .then(_=>{
                    this.setState({ targetKeys})
                });
        }
    }

    render(){
        return (<Card title={this.props.title} bordered={this.props.bordered}  >

            <div>
                当前角色名：{this.props.record.username}
            </div>

            <Transfer titles={['角色池','赋予的角色']}
                dataSource={this.state.dataSource} 
                targetKeys={this.state.targetKeys} 
                render={item=>item.title}
                onChange={(targetKeys)=>{this.setState({targetKeys})}}
            />

            <div>
                <Button type="primary" onClick={()=>{
                    const username=this.props.record.username;
                    const roles=this.state.targetKeys;
                    updateRolesOfUsername(username,roles)
                        .then((resp)=>{
                            if(resp.status=="SUCCESS"){
                                message.info('修改角色成功');
                            }else{
                                message.error(`操作失败：${resp.msg}`);
                            }
                        })
                }}>
                    确定
                </Button>
            </div>
        </Card>);
    }
}

RoleManager.defaultProps={
    title:'角色管理',
    bordered:true,
    record:{}, 
};


export default RoleManager;
