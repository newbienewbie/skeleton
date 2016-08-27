import React from 'react';

/**
 * Dashboard的上部导航
 */
const TopNav = React.createClass({
    render: function (params) {
        return (<nav className="navbar navbar-inverse navbar-fixed-top">
            <div className="container-fluid">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false"
                        aria-controls="navbar">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <a className="navbar-brand" href="#">魅影视听</a>
                </div>
                <div id="navbar" className="navbar-collapse collapse">
                    <ul className="nav navbar-nav navbar-right">
                        <li><a href="#">管理面板</a></li>
                        <li><a href="#">设置</a></li>
                        <li><a href="#">profile</a></li>
                        <li><a href="#">帮助</a></li>
                    </ul>
                    <form className="navbar-form navbar-right">
                        <input type="text" className="form-control" placeholder="Search..."/>
                    </form>
                </div>
            </div>
        </nav>);
    }
});


export default TopNav;