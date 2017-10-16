import React from  'react';
import Nav from './nav-top.jsx';

import Post from './post/post.jsx';
import Movie from './movie/movie.jsx';
import User from './user/main.jsx';
import Ebook from './ebook';
import {Home} from './home.jsx';
import Role from './role';
import Resource from './resource';

/**
 * 初始化message，全局配置
 */
import {message} from 'antd';
message.config({
    top:'10em'
});


/**
 * Dashboard 应用
 */
const Main = React.createClass({
    render: function () {
        return (<div>
            <Nav/>
            {this.props.children || <Home/>}
        </div>);
    }
});

export default {Main,Post,Movie,Ebook,User,Role,Resource};