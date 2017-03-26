import React from 'react';


export const Tree=React.createClass({
    
    getDefaultProps:function(){
        return {
            tree:[]
        };
    },

    _toDOM:function(tree){
        return(<ul>
            {tree.map(i=>{
                return (<li key={i.value.id}> 
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