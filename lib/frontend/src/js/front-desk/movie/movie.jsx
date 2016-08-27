import React from 'react';
import Home from './home.jsx';

const Main=React.createClass({
    render:function(){
        return (<div className="container">
            {this.props.children}
        </div>);
    },
});

export default {Main,Home};