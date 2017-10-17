import React from 'react';
import {TreeSelect} from 'antd';
import {categoryapi} from '../../../api/admin';
import {fixControlledValue} from './helper';




  
/**
 * convert node={value,children} to the shape required by <TreeSelect/>
 */
function _treeSelectNodeDataAdapter(n){

    if(!n || !n.value ){ return null; }

    const label=n.value.name;
    const value=n.value.id;
    const key=value;
    let children=[];
    if(n.children && Array.isArray(n.children) && n.children.length>1){
        children=n.children.map(c=>_treeSelectNodeDataAdapter(c));
    }
    return { label, value, key, children };
}

/**
 * convert an array of node to the shape required by <TreeSelect/>
 */
function treeSelectDataAdapter(tree=[]){
    console.log(tree);
    const result= tree.map(n=>_treeSelectNodeDataAdapter(n));
    console.log(result);
    return result;
}


/**
 * Category Selector Component
 */
export class CategorySelector extends React.Component{

    constructor(props){
        super(props);
        this.state={
            value:this.props.initialValue,
            categories:[ ], // tree
            disabled:true,  // disabled when not ready
        };
    }
    
    componentWillReceiveProps(nextProps){
        // 只有在受控模式下，才会试图同步编辑器的值
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

    componentDidMount(){
        let {initialValue,value}=this.props;
        if('value' in this.props){
            value=fixControlledValue(value);
            initialValue=value;    
        }else{
            initialValue=fixControlledValue(initialValue);
        }
        return categoryapi.getCategoryTree(this.props.scope)
            // convert to <TreeSelect/> data
            .then(tree=> treeSelectDataAdapter(tree))
            .then(tree=>{
                this.setState({categories:tree,value:initialValue,disabled:false});
            });
    }


    render(){
        return (
        <TreeSelect placeholder="选择" style={{width:'200px'}}
            value={this.state.value} onChange={this.props.onChange} 
            treeData={this.state.categories}
        >
        </TreeSelect>);
    }
}


CategorySelector.defaultProps={
    scope:'post',
};

export default CategorySelector;