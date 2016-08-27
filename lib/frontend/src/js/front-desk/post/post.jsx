import React from 'react';
import Home from './home.jsx';
import Detail from './detail.jsx';


const Aside=React.createClass({
    render:function () {
        return <aside>这里是侧边栏</aside>;
    }
});


/**
 * Post 由主内容区和<Aside>组成
 */
const Main=React.createClass({
    render:function () {
        return (<div className="container">
            {this.props.children || <Home/> }
            <Aside/>
        </div>);
    }
});

export default {Main,Home,Detail};