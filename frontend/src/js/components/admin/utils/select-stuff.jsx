import React from 'react';
import {Select,message} from 'antd';
import 'whatwg-fetch'; 

export class SelectStuff extends React.Component{

    constructor(props){
        super(props);
        this.state= {
            data:[
                {k:'',v:''},    
            ],
        };
    }

    componentDidMount(){
        fetch(this.props.remoteUrl,{
            credentials: 'same-origin'
        })
        .then(resp=>resp.json())
        .then((d)=>{
            this.setState(
                {data:this.props.convert(d)},
                ()=>{ }
            );
        });
    }

    render(){
        return(
            <Select showSearch placeholder={this.props.placeholder} defaultValue={this.props.defaultValue}
                optionFilterProp="children" notFoundContent={this.props.notFoundContent}
                onChange={this.props.onChange}
                >
                {this.state.data.map(i=>{
                    return(
                        <Select.Option key={i.k} value={i.k+""} > {i.v} </Select.Option>
                    );
                })}  
            </Select>
        ); 
    }

}

SelectStuff.defaultProps={
    remoteUrl:"",
    /**
     * 负责把服务端返回的JSON数据转换为state中的data属性值,
     * data 一般是[{k:'',v:''},]的格式参见 getInitialState返回的初始state 
     */
    convert:(json)=>{
        return [];
    },   
    placeholder:'',
    notFoundContent:'无此选项',
    onChange:()=>{},
};


export default SelectStuff;