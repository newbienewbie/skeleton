import React from 'react';
import {Row,Col} from 'antd';
import Add from './add/index.jsx';
import Edit from './edit/index.jsx';
import List from './list/index.jsx';
import {AsideOfConsole} from '../utils/aside.jsx';


const Main=React.createClass({

    render:function () {
        return (<Row>
            <Col span={4}> <AsideOfConsole /> </Col>
            <Col span={20}>
                <div className="container">
                    {this.props.children || "文章管理" }
                </div>
            </Col>
        </Row>);
    }
})


export default {Main,Add,Edit,List};