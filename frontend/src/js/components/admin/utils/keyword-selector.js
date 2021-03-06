import React from  'react';
import {Select} from  'antd';
import {fixControlledValue} from './helper';


export class KeywordSelector extends React.Component{

    constructor(props){
        super(props);
        this.state={
            initialValue:this._getValue(this.props.initialValue),
            value:this._getValue(this.props.value),
        };
    }

    componentWillReceiveProps(nextProps){
        if( 'value' in nextProps){
            const nextValue=fixControlledValue(nextProps.value);
            const thisValue=fixControlledValue(this.props.value);
            // 如果下一个value值和现在的value值相同，则不再同步。
            if(nextValue == thisValue){
                return;
            }
            this.setState({ value:nextValue });
        }
    }

    _getValue(keywords){
        if(!!keywords&& !!(keywords[0]) && !!(keywords[0].tag)){
            const value=keywords.map(kw=>kw.tag);
            return value;
        }
        return [];
    }

    componentDidMount(){
        let {initialValue,value}=this.props;
        if('value' in this.props){
            value=fixControlledValue(value);
            initialValue=value;    
        }else{
            initialValue=fixControlledValue(initialValue);
        }
        return this.setState({value:initialValue});
    }

    render(){
        return (
        <Select mode={'tags'}  searchPlaceholder="关键词" 
            value={this._getValue(this.props.value)}
            onChange={this.props.onChange}
        >
        </Select>);
    }

}

KeywordSelector.defaultProps={
    onChange:(list)=>{},
};


export default KeywordSelector;