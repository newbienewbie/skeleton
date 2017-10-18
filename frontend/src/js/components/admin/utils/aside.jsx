import React from 'react';
import {Row,Col,Menu} from 'antd';
import {Link} from 'react-router';

/**
 * Dashboard 的侧边栏
 */
export class AsideOfConsole extends React.Component{
    render () {
        return (<Menu mode="inline">
            <Menu.SubMenu key='video' title="视频" >
                <Menu.ItemGroup key="videoGroup">
                    <Menu.Item key="videoAdd">
                        <Link to="/movie/add">新增</Link>
                    </Menu.Item>
                    <Menu.Item key="videoReport">
                        <Link to="/movie/list">报表</Link>
                    </Menu.Item>
                </Menu.ItemGroup>
            </Menu.SubMenu>
            <Menu.SubMenu key="post" title="文章">
                <Menu.ItemGroup key='postGroup'>
                    <Menu.Item key="postAdd">
                        <Link to="/post/add">新增</Link>
                    </Menu.Item>
                    <Menu.Item key="postList">
                        <Link to="/post/list">列表</Link>
                    </Menu.Item>
                </Menu.ItemGroup>
            </Menu.SubMenu>
            <Menu.SubMenu key="ebook" title="书籍">
                <Menu.ItemGroup key="ebookGroup">
                    <Menu.Item key="ebookAdd">
                        <Link to="/ebook/add">新增</Link>
                    </Menu.Item>
                    <Menu.Item key="ebookList">
                        <Link to="/ebook/list">列表</Link>
                    </Menu.Item>
                </Menu.ItemGroup>
            </Menu.SubMenu>
        </Menu>);
    }
};



export class AsideOfUserControl extends React.Component{
    render () {
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
            <Menu.SubMenu key="role" title="角色">
                <Menu.ItemGroup key="roleGroup">
                    <Menu.Item key="roleList">
                        <Link to="/role/list"> 列表</Link>
                    </Menu.Item>
                    <Menu.Item key="roleCreate">
                        <Link to="/role/create"> 创建 </Link>
                    </Menu.Item>
                </Menu.ItemGroup>
            </Menu.SubMenu>
            <Menu.SubMenu key="resource" title="资源管理">
                <Menu.ItemGroup key="resourceGroup">
                    <Menu.Item key="resourceList">
                        <Link to="/resource/list"> 列表</Link>
                    </Menu.Item>
                    <Menu.Item key="resourceCreate">
                        <Link to="/resource/create"> 创建 </Link>
                    </Menu.Item>
                </Menu.ItemGroup>
            </Menu.SubMenu>
        </Menu>);
    }
}

export default AsideOfConsole;