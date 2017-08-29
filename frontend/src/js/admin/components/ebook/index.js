import React from 'react';
import {Row,Col} from 'antd';
import Add from './add/index.js';
import Edit from './edit';
import List from './list';
import {Aside} from '../utils/aside.jsx';

const Main=React.createClass({

    render:function () {

        return (<Row>
            <Col span={4}>
                <Aside />
            </Col>
            <Col span={20}>
                <div className="container">
                    {this.props.children}
                </div>
            </Col>
        </Row> );
    }
});


export default {Main,Add,List,Edit}; 