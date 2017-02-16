import React from 'react';
import Home from './home/index.jsx';
import Detail from './detail.jsx';
import Aside from './aside.jsx';
import './style.less';

/**
 * Post 由主内容区和<Aside>组成
 */
const Main=React.createClass({
    render:function () {
        return (<div id="post">
            <div className="post-main">
                {this.props.children || <Home/> }
            </div>
            <Aside/>
        </div>);
    }
});

export default {Main,Home,Detail};