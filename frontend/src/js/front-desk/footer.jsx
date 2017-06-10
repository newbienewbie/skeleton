import React from  'react';

const _FooterItem=React.createClass({
    getDefaultProps:function () {
        let year=(new Date()).getFullYear();
        return{
            h:`© ${year} 大水`,
            p:"All rights reserved.",
        };
    },
    render:function () {
        let divStyle={
        };
        return (<div className="col-md-3" style={divStyle}>
            <h6>{this.props.h}</h6>
            <p dangerouslySetInnerHTML={{__html:this.props.p}} ></p>
        </div>);
    }
});

const Footer = React.createClass({
    render: function () {
        return (<div className="container">
            <_FooterItem  />
            <_FooterItem h="导演" p="前朝大侠" />
            <_FooterItem h="编剧" p="<a href='mailto:itminus@<163>.com'> 关外行人 </a>" />
            <_FooterItem h="主演" p="<a href='mailto:itminus@<163>'> 似去如来 </a>" />
        </div>);
    }
});

export default Footer;