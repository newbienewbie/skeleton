import React from 'react';
import {Row,Col} from 'antd';
import {AsideOfConsole} from './utils/aside.jsx';

export const Home=React.createClass({
    render:function(){
        return (<Row>
            <Col span={4}>
                <AsideOfConsole />
            </Col>
            <Col span={20}>
                欢迎来到管理控制台
            </Col>
        </Row> );
    }
});


export default Home;