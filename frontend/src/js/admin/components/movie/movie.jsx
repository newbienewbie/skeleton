/**
 * movie的统一出口
 */
import React from 'react';
import {Row,Col} from 'antd';
import Home from './home.jsx';
import Add from './add.jsx';
import List from './list/index.jsx';
import {Aside} from '../utils/aside.jsx';


const Main=React.createClass({

    render:function () {
        return (<Row>
            <Col span={4}> <Aside /> </Col>
            <Col span={20}>
                <div className="container">
                    {this.props.children || <Home/> }
                </div>
            </Col>
        </Row>);
    }
});

export default { Main,Home,Add,List} ; 