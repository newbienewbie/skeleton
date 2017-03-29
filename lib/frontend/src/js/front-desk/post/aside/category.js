import React from 'react';
import {Tree} from '../../tree';
import 'whatwg-fetch';

export const Category=React.createClass({
    getInitialState:function(){
        return {
            categories:[],
        };
    },

    componentDidMount(){
        fetch(`/category/tree/post`)
            .then(resp=>resp.json())
            .then(info=>{
                this.setState({
                    categories:info
                });
            })
    },

    render() {
        return(<aside>
            <div>categories</div>
            <Tree tree={this.state.categories} onClick={(id)=>{
                document.location=`/#/post/recent/${id}`;
            }}/>
        </aside>);
    }
});


export default Category;