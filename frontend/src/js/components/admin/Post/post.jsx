import React from 'react';
import {Row,Col} from 'antd';
import {Add} from './add/index.jsx';
import Edit from './edit/index.jsx';
import List from './list/index.jsx';
import {AsideOfConsole} from '../utils/aside.jsx';
import {MenuTree} from '../utils/menu-tree';



class Main extends React.Component{

    render() {
        return (<Row>
            <Col span={4}>
                <MenuTree scope='cms' />
            </Col>
            <Col span={20}>
                <div className="container">
                    {this.props.children || "文章管理" }
                </div>
            </Col>
        </Row>);
    }
}


export default {Main,Add,Edit,List};