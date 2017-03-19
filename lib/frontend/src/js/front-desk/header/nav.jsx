import React from 'react';
import {Link} from 'react-router' ;

export const Nav=React.createClass({
    getDefaultProps:function (params) {
        return {
            navList:[
                {href:"/",text:"home"},
                {href:"/post",text:"文章"},
                {href:"/movie",text:"视频"},
                {href:"/ebook",text:"书籍"},
                {href:"/about",text:"about"},
                {href:"/archives",text:"archives"},
                {href:"/contact",text:"contact"},
            ],
        };
    },
    getInitialState:function(){
        return {
            active:"home",
        };
    },
    render:function () {
        let list=this.props.navList.map((i,k)=>{
            return (
            <li key={k} 
                onClick={(e)=>{
                    this.setState({active:i.text});
                    e.preventDefault();
                }} 
                className={this.state.active==i.text?'active':''}
            >
                <Link to={i.href} >
                   {i.text}
                </Link>
            </li>);
        });
        return (<ul className="nav nav-pills nav-fixed-top">
            {list}
        </ul>);
    }
});


export default Nav;