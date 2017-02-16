import React from 'react';
import {Link} from 'react-router' ;

export const Logo= React.createClass({
    render:function () {
        return (<div className="logo">
            <Link to="/">
                <img src="/static/img/logo.jpg" className="img-responsive" alt=""/>
            </Link>
        </div>);
    }
});


export default Logo;