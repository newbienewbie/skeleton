import React from 'react';
import {Pagination} from 'antd';



const List=React.createClass({

    getInitialState:function(){
        return {
            total:1,
            current:1,
        };
    },

    render:function(){
        return (<div className="container">
            <div>
                hello,world
            </div>
            <Pagination total={this.state.total} current={this.state.current} onChange={(v)=>{this.setState({current:v})}} />
        </div>);
    }
});




module.exports=List;
