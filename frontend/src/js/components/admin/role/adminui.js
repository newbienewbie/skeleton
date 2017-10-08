import React from 'react'; 
import {Row,Col,Table,Modal,Popconfirm,message,Form} from 'antd';

export const datagrid={

    create:function(model,AddOrEditFormModal){

        class List extends React.Component{

            constructor(props){
                super(props);
                this.state={
                data:[],
                    pagination:{},
                    loading:true,
                    editModalVisible:false,
                    currentRecord:{},
                };
                this.editForm=null;
                // bind function to this
                this.onRemove=this.onRemove.bind(this);
                this.onEditFormSubmit=this.onEditFormSubmit.bind(this);
                this.onEditFormCancel=this.onEditFormCancel.bind(this);
            }

            onRemove(record){
                return model.methods.remove(record.id)
                    .then(resp=>{
                        console.log(resp);
                        message.warning('删除成功');
                    })
                    // 刷新数据源
                    .then(_=>{
                        const {current,pageSize,}=this.state.pagination;
                        return model.methods.list(current,pageSize);
                    })
                    .then(models=>{
                        const dataSource=models.map((r,i)=>Object.assign({},r,{key:i}));
                        this.setState({data:dataSource,loading:false});
                    });
            }

            onEditFormSubmit(){
                return this.editForm.validateFields((err,values)=>{
                    if(!err){
                        const {id}=this.state.currentRecord;
                        model.methods.update(id,values)
                            .then(resp=>{
                                message.success(`修改成功`);
                                console.log(resp);
                                this.setState({editModalVisible:false},()=>{
                                    // 刷新数据源
                                    const {current,pageSize,}=this.state.pagination;
                                    return model.methods.list(current,pageSize)
                                        .then(models=>{
                                            const dataSource=models.map((r,i)=>Object.assign({},r,{key:i}));
                                            this.setState({data:dataSource,loading:false});
                                        });
                                });
                            })
                    }
                });
                
            }

            onEditFormCancel(){
                this.setState({editModalVisible:false});
            }

            componentDidMount(){
                this.setState({loading:true},()=>{
                    const {current,pageSize}=this.state.pagination;
                    return model.methods.list(current,pageSize).then(models=>{
                        const dataSource=models.map((r,i)=> Object.assign({},r,{key:i}) );
                        this.setState({data:dataSource,loading:false});
                    });
                });
            }
            render() {
                const {Column,ColumnGroup}=Table;
                const fields=model.fields;
                return (<div>
                <Table dataSource={this.state.data} pagination={this.state.pagination} loading={this.state.loading} onChange={this.state.onChange} >
                    { Object.keys(fields).map(k=>{
                        const field=fields[k];
                        return <Column title={field.title} key={k} dataIndex={k} />;
                    }) }
                    <Column title='操作' key='action' render={(text, record) => (
                        <span>
                            <a onClick={()=>{this.setState({editModalVisible:true,currentRecord:record});return false; }} >修改</a>
                            <span className='ant-divider' />
                            <Popconfirm title='确认要删除吗' okText='是' cancelText='否' onConfirm={() => { this.onRemove(record); }} >
                                <a href='#'>删除</a>
                            </Popconfirm>
                            <span className='ant-divider' />
                        </span>)} />
                </Table>

                <AddOrEditFormModal ref={form=>this.editForm=form} visible={this.state.editModalVisible}
                    initialValues={this.state.currentRecord}
                    onOk={this.onEditFormSubmit}
                    onCancel={this.onEditFormCancel}
                />

            </div>);
            }
        }

        return List;
    },

};

export const addform={
    create:function(model,AddOrEditForm){

        class AddForm extends React.Component{
            constructor(props){
                super(props);
                this.formRef=null;
                // bind `this`
                this.onOk=this.onOk.bind(this);
            }

            onOk(){
                return this.formRef.validateFields((err,value)=>{
                    if(!err){
                        model.methods.create(value)
                            .then(resp=>{
                                message.success(`创建成功`);
                                this.formRef.resetFields();
                            })
                            .catch(e=>{
                                message.error(`失败`+e);
                            });
                    }
                });
            }
        
            render() {
                return <AddOrEditForm ref={form=>this.formRef=form} onOk={this.onOk} /> ;
            }
        }

        return AddForm;
    },
};