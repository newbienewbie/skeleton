import React from  'react';

const _AboutItem=React.createClass({
    getDefaultProps:function (params) {
        return {
            imgSrc:"/static/img/lusuirenmangmang.jpg",
            title:"地精工程师",
            description:`这家伙很懒，什么都没写下
            `,
            moreUrl:"#",
        };
    },
    render:function (params) {

        let containerStyle={
            backgroundColor:"#ccdfd2",
            marginTop:"0.5em",
            borderWidth:"0.5em",
            borderRadius:'1.0em',
        };
        let imgStyle={
            width:"100%",
            height:'100%',
            borderRadius:"50%"
        };
        return (<div className="row" style={containerStyle}>
            <div className="col-md-4" >
                <img style={imgStyle} src={this.props.imgSrc}/>
            </div>
            <div className="col-md-8">
                <h4>{this.props.title}</h4>
                <p>{this.props.description}</p> 
                <a href="{this.props.moreUrl}" className="link">Read More</a>
            </div>
        </div>);
    }
});

const About=React.createClass({
    getDefaultProps:function (params) {
        return {

        };
    },
    render:function (params) {
        return ( <div id="about">
            <div className="container">
                <h2>关于</h2>
                <div className="container">
                    <p>个人娱乐项目</p>
                    <p></p>
                </div>
                <div className="container">
                    <_AboutItem
                        title="攻城狮"
                        />
                    <_AboutItem
                        title="射鸡师"
                        description="暂缺"
                        />
                </div>
            </div>
        </div>);
    },
});

export default About;