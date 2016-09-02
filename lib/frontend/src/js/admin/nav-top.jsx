import React from 'react';
import {Menu} from 'antd';

/**
 * Dashboard的上部导航
 */
const TopNav = React.createClass({
    render: function (params) {
        return (<nav >
            <Menu mode="horizontal">
                <Menu.Item  key="project">
                    魅影
                </Menu.Item>
                <Menu.Item key="settings">
                    设置
                </Menu.Item>
                <Menu.Item key="profile">
                    profile
                </Menu.Item>
                <Menu.Item key="help">
                    帮助
                </Menu.Item>
            </Menu>
        </nav>);
    }
});


export default TopNav;