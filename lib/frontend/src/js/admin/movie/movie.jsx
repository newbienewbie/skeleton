/**
 * movie的统一出口
 */
import React from 'react';
import {Row,Col} from 'antd';
import Home from './home.jsx';
import Add from './add.jsx';


const Main=React.createClass({
    render:function(){
        return (<Row className="">
            {this.props.children || <Home/> }
        </Row>);
    }
});

export default { Main,Home,Add} ; 