import React from 'react';
import {Link} from 'react-router' ;

const Logo= React.createClass({
    render:function () {
        return (<div className="logo">
            <Link to="/">
                <img src="/static/img/logo.png" className="img-responsive" alt=""/>
            </Link>
        </div>);
    }
});

const Search=React.createClass({
    render:function (params) {
        const inputStyle={
            marginTop:"0.4em",
        };
        return (<div className="col-md-3">
             <input name="search" style={inputStyle} />
        </div>);
    }
});

const Nav=React.createClass({
    getDefaultProps:function (params) {
        return {
            navList:[
                {href:"/",text:"home"},
                {href:"/post",text:"文章"},
                {href:"/movie",text:"视频"},
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
        return (<div className="col-md-8">
            <ul className="nav nav-pills nav-fixed-top">
                {list}
            </ul>
        </div>);
    }
});

const Header = React.createClass({

    render:function () {
        return (<div className="container">
            <div className="row">
                <Nav/>
                <Search/>
            </div>
        </div>);
    }
});

export default Header;