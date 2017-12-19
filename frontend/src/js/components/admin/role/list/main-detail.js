import React from 'React';
import { Row,Col,Button,Modal,message,Table} from "antd";
import {decorateAddOrEditModal,datagrid} from 'tiny-admin';
import {model as roleModel} from '../_common/model';
import {model as associcationModel} from '../_common/resource-model';
import {PlainAddOrEditForm} from '../_common/add-or-edit-form';


const AddOrEditFormModal=decorateAddOrEditModal(PlainAddOrEditForm);
const MainDatagrid=datagrid(roleModel,AddOrEditFormModal);
const DetailDatagrid=datagrid(associcationModel,AddOrEditFormModal);


export class AssocationsAdminTable extends React.Component{
    constructor(props){
        super(props);
        this.state={
            data:[],
            pagination:{},
            selectedRowKeys:[],
            loading:false,
        };
    }


    promiseSetState(state){
        return new Promise((resolve,reject)=>{
            this.setState(state,()=>{ resolve(); });
        });
    }


    /**
     * 当表单发生分页变化、过滤器变化、或者排序器变化时，应该从服务器重新加载数据
     * @param {*} pagination 
     * @param {*} condition 条件 
     * @param {*} sorter 
     */
    onTableChange(pagination, condition={}, sorter={},context={}) {

        const {pageSize,current}=pagination;
        return associcationModel.methods.listAll(current, pageSize ,condition , context)
            .then(result=>{
                const {count,rows}=result;
                const pagination = Object.assign({}, this.state.pagination );
                pagination.total = count;
                pagination.current=current;

                const headItem=this.props.headItem;
                return associcationModel.methods.determineWhetherResourcesAssociatedWithRole(rows.map(r=>r.id),{headItem})
                    .then(assocations=>{
                        console.log(`assocations`,assocations);
                        return this.promiseSetState({ 
                            loading: false, 
                            data:rows? rows.map(r=>{
                                r.key=r.id;
                                return r;
                            }) :[], 
                            pagination, 
                            selectedRowKeys:assocations.filter(a=>a.flag===true).map(a=>a.id),
                        });
                    });
            });
    }

    componentWillReceiveProps(nextProps){
        console.log('receive');
        if(nextProps.headItem.id== this.props.headItem.id){
            // return;  // 注释掉：不管怎么样，都强制刷新
        }
        console.log('reload');
        const pagination=Object.assign({},this.state.pagination,{current:1});
        this.onTableChange(pagination);
    }

    componentDidMount(){
        return this.onTableChange(this.state.pagination);
    }

    grantResourceToRole(resourceId,headItem){
        return this.promiseSetState({loading:true})
            .then(_=>associcationModel.methods.grantResourceToRole(resourceId,{headItem}) ) 
            .then(result=>{
                if(result && result.status=="SUCCESS"){message.success(`授权成功`);}
                else{ message.error(`授权失败`);console.log(result);}
                this.promiseSetState({loading:false});
            });
    }

    grantResourceToRoleCancel(resourceId,headItem){
        return this.promiseSetState({loading:true})
            .then(_=>associcationModel.methods.grantResourceToRoleCancel(resourceId,{headItem}) ) 
            .then(result=>{
                if(result && result.status=="SUCCESS"){message.success(`操作成功`);}
                else{ message.error(`操作失败`);console.log(result);}
                this.promiseSetState({loading:false});
            });
    }

    render(){
        const fields=associcationModel.fields;
        return( 
        <Table loading={false} 
            dataSource={this.state.data}
            rowSelection={{
                type:'checkbox',
                selectedRowKeys:this.state.selectedRowKeys,
                onChange:(selectedRowKeys,selectedRows)=>{
                    console.log(`change`,selectedRows);
                    this.setState({selectedRowKeys})
                },
                onSelect:(record,selected,selectedRows)=>{
                    const headItem=this.props.headItem;
                    if(selected){
                        this.grantResourceToRole(record.id,headItem)
                            .then(_=>{
                                message.info(`为角色授权该资源`);
                            });
                        return false;
                    }else{
                        console.log(`select`,selected);
                        this.grantResourceToRoleCancel(record.id,headItem)
                            .then(_=>{
                                message.info(`取消授权该资源`);
                            });
                        return false;
                    }
                },
            }} 
            pagination={this.state.pagination}
            onChange={this.onTableChange.bind(this)}
        >
            {Object.keys(fields).map(k=>{
                return <Table.Column title={fields[k].title} key={k} dataIndex={k}/>;
            })}
        </Table>);
    }
}


export class AssocationsAdminModal extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return <Modal title="关联管理" width={720}
            visible={this.props.visible} 
            footer={null}
            closable={true}
            maskClosable={false}
            onCancel={this.props.onCancel}
        >
            <AssocationsAdminTable headItem={this.props.headItem}/>
        </Modal>
    }
}

export class MainDetailAdmin extends React.Component{

    constructor(props){
        super(props);
        this.state={
            headItem:{},
        };
        this.onMainDatagridRowClick=this.onMainDatagridRowClick.bind(this);
        this.detailDatagrid=null;
    }

    onMainDatagridRowClick(record){
        this.setState({
            headItem:record,
            createAssociationModalVisible:false
        });
    }

    render(){
        return (<div>
            <Row>
                <MainDatagrid onRowClick={ this.onMainDatagridRowClick } />
            </Row>
            <Row>
                <Col span={16}>
                    <DetailDatagrid ref={dg=>this.detailDatagrid=dg} headItem={this.state.headItem}/>
                </Col>
                <Col span={8}>
                    <Button onClick={()=>{
                        const headItem=this.state.headItem;
                        if(!headItem || !headItem.id){
                            message.warning('请先指定相关角色');
                            return;
                        }
                        this.setState({createAssociationModalVisible:true})
                    }}>关联管理</Button>
                </Col>
            </Row>
            <AssocationsAdminModal visible={this.state.createAssociationModalVisible} 
                headItem={this.state.headItem}
                onCancel={()=>{
                    const headItem=this.state.headItem;
                    this.setState(
                        {
                            createAssociationModalVisible:false,
                            headItem,
                        },
                        ()=>{
                            this.detailDatagrid  && this.detailDatagrid.refresh({headItem});
                        }
                    );
                    return false;
                }}
            />

        </div>);
    }
}