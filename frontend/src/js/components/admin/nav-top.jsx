import React from 'react';
import {Link} from 'react-router';
import {Menu} from 'antd';

/**
 * Dashboard的上部导航
 */
class TopNav extends React.Component{
    render (params) {
        return (<nav >
            <Menu mode="horizontal">
                <Menu.Item  key="project">
                    <Link to={"/"}>控制台</Link>
                </Menu.Item>
                <Menu.Item key="settings">
                    <Link to={"/user/list"}>系统管理</Link>
                </Menu.Item>
                <Menu.Item key="help">
                    <a href="#" target="_blank">帮助</a>
                </Menu.Item>
                <Menu.Item  key="homepage">
                    <a href="/">首页</a>
                </Menu.Item>
            </Menu>
        </nav>);
    }
}


export default TopNav;