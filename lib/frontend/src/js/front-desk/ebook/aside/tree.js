import React from 'react';


export const Tree=React.createClass({
    
    getDefaultProps:function(){
        return {
            list:[]
        };
    },

    _toDOM:function(list){
        return(<ul>
            {list.map(i=>{
                return (<li key={i.value.id}> 
                    {i.value.name}
                    {this._toDOM(i.children)}
                </li>);
            })}
        </ul>);
    },

    render:function () {
        return this._toDOM(this.props.list);
    }
});



export default Tree;