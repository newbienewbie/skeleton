import React from 'react';
import Add from './add.jsx';

const Main=React.createClass({

    render:function () {

        return (<div className="container">
            {this.props.children}
        </div>);
    }
});


export default {Main,Add};