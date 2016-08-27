import React from 'react';
import {Link} from 'react-router';

/**
 * Dashboard 的侧边栏
 */
const Aside = React.createClass({
    render: function () {
        return (<div className="col-sm-3 col-md-2 sidebar">
            <ul className="nav nav-sidebar">
                <p>视频</p>
                <li className="active"><Link to="/movie/add">新增 <span className="sr-only">(current) </span></Link></li>
                <li><Link to="/">Reports</Link></li>
                <li><Link to="/">Analytics</Link></li>
                <li><Link to="/">Export</Link></li>
            </ul>
            <ul className="nav nav-sidebar">
                <p>文章</p>
                <li><Link to="/post/add">新增</Link></li>
            </ul>
            <ul className="nav nav-sidebar">
                <p>导演</p>
                <li><Link to="/director/add">新增</Link></li>
            </ul>
        </div>);
    }
});

export default Aside;