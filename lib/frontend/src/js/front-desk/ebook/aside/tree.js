import React from 'react';
import "./tree.less";

export const Tree=React.createClass({
    
    getDefaultProps:function(){
        return {
            tree:[],
            onClick:(id)=>{}
        };
    },

    _toDOM:function(tree){
        return(<ul className="tree">
            {tree.map(i=>{
                return (<li key={i.value.id} data={i.value.id} onClick={(e)=>{
                    e.preventDefault();
                    e.stopPropagation();
                    this.props.onClick(i.value.id);
                    return false;
                }}> 
                    {i.value.name}
                    {this._toDOM(i.children)}
                </li>);
            })}
        </ul>);
    },

    render:function () {
        return this._toDOM(this.props.tree);
    }
});



export default Tree;