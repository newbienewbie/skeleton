import React from  'react';
import {Row,Col} from 'antd';
import Nav from './nav-top.jsx';
import Aside from './aside.jsx';

import Post from './post/post.jsx';
import Movie from './movie/movie.jsx';
import User from './user/main.jsx';
import Book from './book';


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
            <Row>
                <Col span={4}>
                    <Aside />
                </Col>
                <Col span={20}>
                    {this.props.children || "dashboard"}
                </Col>
            </Row>
        </div>);
    }
});

export default {Main,Post,Movie,Book,User};