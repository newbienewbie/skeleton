import React from  'react';
import Nav from './nav-top.jsx';
import Aside from './aside.jsx';

import Post from './post/post.jsx';
import Movie from './movie/movie.jsx';
import Director from './director/director.jsx';


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
        return (<div className="container-fluid">
            <Nav/>
            <div className="row">
                <Aside />
                {this.props.children || "dashboard"}
            </div>
        </div>);
    }
});

export default {Main,Post,Movie,Director};