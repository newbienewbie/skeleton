import React from 'react';
import {Row,Col} from 'antd';
import Add from './add/index.js';
import Edit from './edit';
import List from './list';
import {AsideOfConsole} from '../utils/aside.jsx';

export class Main extends React.Component{

    render() {

        return (<Row>
            <Col span={4}>
                <AsideOfConsole />
            </Col>
            <Col span={20}>
                <div className="container">
                    {this.props.children}
                </div>
            </Col>
        </Row> );
    }
}


export default {Main,Add,List,Edit}; 