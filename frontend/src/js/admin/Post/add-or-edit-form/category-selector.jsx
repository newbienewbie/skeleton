import React from 'react';
import {Select} from 'antd';
import 'whatwg-fetch';


export const CategorySelector=React.createClass({

    getDefaultProps(){
        return {
            value:-1,
            onChange:(value)=>{}
        };
    },

    getInitialState(){
        return {
            categories:[
                {id:-1,name:'',note:''}
            ],
            disabled:true,
        };
    },

    componentDidMount(){
        fetch('/category/list/post',{
            method:'get',
            credentials:'same-origin',
        }).then(resp=>resp.json())
        .then(list=>{
            this.setState({categories:list.rows,disabled:false});
        });
    },


    render(){
        return <Select  value={this.props.value} 
            placeholder="选择栏目"
            style={{width:'200px'}}
            onChange={this.props.onChange} 
            disabled={this.state.disabled}
            filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0 } 
        >
            {this.state.categories.map((c,i)=>{
                return <Select.Option key={i} value={c.id} >
                    {c.name}
                </Select.Option>;
            })}
        </Select>;
    }
});

export default CategorySelector;