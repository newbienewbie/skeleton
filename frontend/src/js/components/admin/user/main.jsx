import React from 'react';
import {Row,Col} from 'antd';
import Home from './home.jsx';
import List from './list/index.jsx';
import Invite from './invite.jsx';
import {AsideOfUserControl} from '../utils/aside.jsx';


const Main=React.createClass({

    render:function () {
        return (<Row>
            <Col span={4}> <AsideOfUserControl /> </Col>
            <Col span={20}>
                <div className="container">
                    {this.props.children || <Home/> }
                </div>
            </Col>
        </Row>);
    }
})


module.exports={Main,Home,List,Invite};