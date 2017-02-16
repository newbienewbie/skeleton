import React from 'react';
import {Link} from 'react-router' ;
import {Nav} from './nav.jsx' ;
import {Search} from './search.jsx';
import './style.less';


const Header = React.createClass({

    render:function () {
        return (<div className="container">
            <div className="row">
                <Nav/>
                <Search/>
            </div>
        </div>);
    }
});

export default Header;