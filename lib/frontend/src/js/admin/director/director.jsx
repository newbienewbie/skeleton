import React from 'react';

import Home from './home.jsx';
import Add from './add.jsx';

const Main=React.createClass({
    render:function(){
        return(<div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
            {this.props.children}
        </div>);
    }
});

export default {Main,Home,Add};