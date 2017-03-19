import React from 'react';
import {Row,Col,Menu} from 'antd';
import {Link} from 'react-router';

/**
 * Dashboard 的侧边栏
 */
export const Aside = React.createClass({
    render: function () {
        return (<Menu mode="inline">
            <Menu.SubMenu key="user" title="用户">
                <Menu.ItemGroup key="userGroup">
                    <Menu.Item key="userList">
                        <Link to="/user/list"> 列表</Link>
                    </Menu.Item>
                    <Menu.Item key="userInvite">
                        <Link to="/user/invite"> 邀请 </Link>
                    </Menu.Item>
                </Menu.ItemGroup>
            </Menu.SubMenu>
        </Menu>);
    }
});

export default Aside;