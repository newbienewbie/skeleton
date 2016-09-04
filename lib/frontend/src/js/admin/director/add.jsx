import React from 'react';
import {Input,DatePicker,Button,Modal,message} from 'antd';
import SelectStuff from '../utils/select-stuff.jsx';
import 'whatwg-fetch';
/**
 * 初始值
 */
const _director={
    name:'',
    birthday:new Date(),
    country:-1,
    hometown:"",
    description:'',
    note:'',
};



const Add=React.createClass({

    getInitialState(){
        return {
            modal:{visible:false },
            director:Object.assign({},_director),
        };
    },
    render:function(){
        const _director=Object.assign({},_director);
        return (<div>
        <h2>导演管理<small>-/-添加</small></h2>
        <form className="form-horizontal">
            <div className="form-group">
                <div className="col-md-2">
                    <label>姓名</label>
                </div>
                <div className="col-md-8">
                    <Input onChange={(v)=>{ 
                        const director=Object.assign({},this.state.director,{
                            name:v.target.value,
                        });
                        this.setState({ director:director });
                    }} />
                </div>
            </div>

            <div className="form-group">
                <div className="col-md-2">
                    <label>出生时间</label>
                </div>
                <div className="col-md-8">
                    <DatePicker onChange={(v)=>{
                        const director=Object.assign({},this.state.director,{
                            birthday:v,
                        });
                        this.setState({ director:director });
                    }} />
                </div>
            </div>

            <div className="form-group">
                <div className="col-md-2">
                    <label>国家/地区</label>
                </div>
                <div className="col-md-8">
                   <SelectStuff placeholder="国家/地区" notFoundContent="暂未收录该国家，请选择其他" 
                        remoteUrl="/country/list"
                        onChange={(v)=>{ 
                            const director=Object.assign({},this.state.director,{
                                country:v,
                            });
                            this.setState({director:director});
                        }}
                        convert={(json)=>{ return json.map((i)=>{
                            return {k:i.id,v:i.name};
                        });}}
                    />
                </div>
            </div>

            <div className="form-group">
                <div className="col-md-2">
                    <label>家乡</label>
                </div>
                <div className="col-md-8">
                    <Input onChange={(v)=>{
                        const director=Object.assign({},this.state.director,{
                            hometown:v.target.value,
                        });
                        this.setState({director:director});
                    }}/>
                </div>
            </div>

            <div className="form-group">
                <div className="col-md-2">
                    <label>描述</label>
                </div>
                <div className="col-md-8">
                    <Input type="textarea" onChange={(v)=>{
                        const director=Object.assign({},this.state.director,{
                            description:v.target.value,
                        });
                        this.setState({director:director});
                    }}/>
                </div>
            </div>

            <div className="form-group">
                <div className="col-md-2">
                    <label>备注</label>
                </div>
                <div className="col-md-8">
                    <Input type="textarea" rows="2" onChange={(v)=>{
                        const director=Object.assign({},this.state.director,{
                            note:v.target.value,
                        });
                        this.setState({director:director});
                    }}/>
                </div>
            </div>

            <div>
                <Button type="primary" 
                    onClick={()=>{ 
                        this.setState({
                            modal:{ visible:true, }
                        });
                    }}>
                    提交
                </Button>
                <Modal visible={this.state.modal.visible} 
                    onOk={()=>{ 
                        // fetch
                        fetch('/director/add',{
                            method:'POSt',
                            headers:{
                                'Content-Type':'application/json',
                            },
                            body:JSON.stringify(this.state.director),
                        })
                        .then((resp)=>{
                            return resp.json();
                        })
                        .then(json=>{
                            if(json.result=="SUCCESS"){
                                message.success("添加记录成功");
                            }else{
                                message.error("添加记录失败"+json.msg);
                            }
                        })
                        .catch(e=>{
                            message.error('请求错误');
                            console.log(e);
                        });

                        this.setState({modal:{visible:false}}); 
                    }} 
                    onCancel={()=>this.setState({modal:{visible:false}})}
                    >
                    请确认是否要提交？
                </Modal>
            </div>

        </form>    
        </div>);
    }
});

export default Add;
