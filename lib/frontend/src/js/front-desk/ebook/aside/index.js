import React from 'react';
import {Tree} from './tree';
import 'whatwg-fetch';

export const Aside=React.createClass({
    getInitialState:function(){
        return {
            categories:[],
        };
    },

    componentDidMount(){
        fetch(`/category/tree/ebook`)
            .then(resp=>resp.json())
            .then(info=>{
                this.setState({
                    categories:info
                });
            })
    },

    render() {
        return(<aside>
            <div>categories </div>
            <Tree tree={this.state.categories} onClick={(id)=>{
                document.location=`/#/ebook/recent/${id}`;
            }}/>
        </aside>);
    }
});


export default Aside;