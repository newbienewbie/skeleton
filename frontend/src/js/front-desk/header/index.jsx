import React from 'react';
import { Link } from 'react-router';
import { Nav } from './nav.jsx';
import './style.less';


const Header = React.createClass({

    render: function () {
        return (<div id="header">
            <div>
                <div className="logo">
                    <Link to="/">
                        <img src="/static/img/logo.jpg" className="img-responsive" alt="" />
                    </Link>
                </div>
                <span>itminus</span>
                <div>
                    <input name="search" />
                </div>
            </div>
            <Nav />
        </div>);
    }
});

export default Header;