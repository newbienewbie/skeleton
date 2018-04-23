import React from 'react';
import {Row,Col} from 'antd';
import {AsideOfUserControl} from '../utils/aside.jsx';
import {MenuTree} from '../utils/menu-tree';
import {Add} from './add';
import {List} from './list';

class Main extends React.Component{

    render() {
        return (<Row>
            <Col span={4}> <MenuTree/> </Col>
            <Col span={20}>
                <div className="container">
                    {this.props.children}
                </div>
            </Col>
        </Row>);
    }
}



export default {Main,Add,List};