import React from 'react';
import {Row,Col} from 'antd';
import {AsideOfConsole} from './utils/aside.jsx';
import {MenuTree} from './utils/menu-tree';

export class Home extends React.Component{
    render(){
        return (<Row>
            <Col span={4}>
                <MenuTree scope="cms" />
            </Col>
            <Col span={20}>
                欢迎来到管理控制台
            </Col>
        </Row> );
    }
}


export default Home;