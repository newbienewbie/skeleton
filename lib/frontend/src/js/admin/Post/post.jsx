import React from 'react';
import Add from './add/index.jsx';
import Edit from './edit/index.jsx';
import List from './list/index.jsx';

const Main=React.createClass({

    render:function () {

        return (<div className="container">
            {this.props.children}
        </div>);
    }
});


export default {Main,Add,Edit,List};