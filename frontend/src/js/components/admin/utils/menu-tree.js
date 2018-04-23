import React from 'react';
import {Row,Col,Menu} from 'antd';
import {Link} from 'react-router';
import {actionapi} from '../../../api/admin';

/**
 * 通用菜单树
 */
export class MenuTree extends React.Component{
    constructor(props){
        super(props);
        this.state={
            category:'',
            menus:[
                {
                    value:{
                        id:'',       /** menu id */
                        name:'',     /** menu name */
                        to : null,   /** link to */
                    },
                    children:[]
                },
            ],
        };
    }
    componentDidMount(){
        // 
        return actionapi.getActionTree("视频")
            .then(menus=>{
                this.setState({menus});
            })
            .catch(e=>{
                alert("加载菜单失败！");
            });
    }

    /**
     * 递归地把单个`menuItem`转换为`<Menu.Item/>`控件
     */
    _renderMenu(menuItem){
        let item=menuItem.value;
        let children= menuItem.children;
        if (children.length == 0){
            return (
                <Menu.Item key={"menu_item-"+item.name+item.id}>
                    <Link key={item.id} to={item.to}>{item.showName}</Link>
                </Menu.Item>
            );
        } else{
            return ( <Menu.SubMenu key={"sub_menu-"+item.name+item.id} title={item.showName}>
                {children.map(m=> this._renderMenu(m)) }
            </Menu.SubMenu>);
        }
    }

    render () {
        let isArray=Array.isArray(this.state.menus);
        return (<Menu mode={this.props.mode} key='root-of-menu-tree'>
            {
                isArray?
                this.state.menus.map((m,idx)=> this._renderMenu(m)) :
                this._renderMenu(this.state.menus) 
            } 
        </Menu>);
    }
};

MenuTree.defaultProps={
    mode:'inline',
};


export default MenuTree;