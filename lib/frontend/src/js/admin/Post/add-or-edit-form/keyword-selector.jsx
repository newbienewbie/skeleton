import React from  'react';
import {Select} from  'antd';

export const KeywordSelector=React.createClass({

    getDefaultProps:function(){
        return {
            keywords:[],
            onChange:(list)=>{},
        };
    },

    _getValue(){
        const keywords=this.props.keywords;
        if(!!keywords&& !!keywords[0].tag){
            const value=keywords.map(kw=>kw.tag);
            return value;
        }
        return [];
    },

    render:function(){
        return (
        <Select tags={true}  searchPlaceholder="关键词" 
            value={this._getValue()}
            onChange={this.props.onChange}
        >
            {this.props.keywords.map(kw=>{
                return <Select.Option key={kw.id} value={kw.tag}>{kw.tag}</Select.Option>;
            })}
        </Select>);
    },

});


export default KeywordSelector;