import React from 'react';
import {Item} from './item.jsx';
import './style.less';


const Home=React.createClass({
    render:function () {
        return (<article id="article-container">
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
        </article>);
    }
});


export default Home;

