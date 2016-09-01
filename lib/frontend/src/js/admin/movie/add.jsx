import React from 'react';
import {Modal,InputNumber,Input,Select,DatePicker,Upload,Button,message} from 'antd';
import {Link} from 'react-router';
import 'whatwg-fetch'; 

import SelectStuff from '../utils/select-stuff.jsx';
import UploadAttachment from './upload-attachment.jsx';

/**
 * 初始值，永不改变，用作initial state，
 */
const _movie={
    title:'',
    knownAs:'',
    languageId:'',
    director:'',
    site:'',
    releaseDate:'',
    countryId:'',
    keyWord:'',
    description:'',
    note:'',
    url:'',
    posterUrl:'',
};


const Add=React.createClass({

    getInitialState:function(){
        return {
            modal:{visible:false},
            movie:_movie,
            btnSubmit:{
                disabled:true,
            },
        };
    },

    getDefaultProps:function(){
        return{
        };
    },

    render:function(){
        const _movie=Object.assign({},_movie);
        return (<div >
            <form className="form-horizontal">
                <div className="form-group">
                    <label className="col-sm-2">名称</label>
                    <div className="col-sm-8"> 
                        <Input onChange={(e)=>{
                            const movie=Object.assign({},this.state.movie,{
                                title:e.target.value,
                            });
                            this.setState({movie:movie});
                        }}/> 
                    </div>
                </div>
                
                <div className="form-group">
                    <label className="col-sm-2">上传电影</label>
                    <div className="col-sm-3"> 
                        <UploadAttachment action="/upload/meiying/video?action=uploadvideo" 
                            onChange={(fileList)=>{
                                if(fileList && fileList[0].response && fileList[0].response.url){
                                    const movie=Object.assign({},this.state.movie,{
                                        url:fileList[0].response.url,
                                    });
                                    const btnSubmit=Object.assign({},this.state.btnSubmit,{
                                        disabled:false,
                                    });
                                    this.setState( { movie, btnSubmit },()=>{
                                        console.log(`附件更新：${this.state.movie.url}`)
                                    });
                                }
                            }} 
                        />
                    </div>
                    <label className="col-sm-2">封面(海报)</label>
                    <div className="col-sm-2"> 
                        <UploadAttachment action="/upload/meiying/image?action=uploadimage"
                            onChange={(info)=>{
                                if(!info.file.response){
                                    return;
                                }
                                const movie=Object.assign({},this.state.movie,{
                                    posterUrl:info.file.response.url,
                                });
                                this.setState({movie});
                            }}
                        /> 
                    </div>
                </div>

                <div className="form-group">
                    <label className="col-sm-2">语言</label>
                    <div className="col-sm-3">
                        <SelectStuff remoteUrl="/language/list"
                            convert={(json) => {
                                return json.map(i => {
                                    return { k: i.id, v: i.lang, };
                                });
                            } }
                            onChange={(v)=>{
                                const movie=Object.assign({},this.state.movie,{
                                    languageId:v,
                                });
                                this.setState({movie:movie});
                            }}
                        />
                    </div>
                    <label className="col-sm-2">国家/地区</label>
                    <div className="col-sm-3">
                        <SelectStuff placeholder="请输入或者选择国家" notFoundContent="暂未收录该国家，请选择：其他"
                            remoteUrl="/country/list"
                            convert={(json) => {
                                return json.map(i => {
                                    return { k: i.id, v: i.name, };
                                });
                            }}
                            onChange={(v)=>{
                                const movie=Object.assign({},this.state.movie,{
                                    countryId:v,
                                });
                                this.setState({movie:movie});
                            }}
                            />
                    </div>
                </div>

                <div className="form-group">
                    <label className="col-sm-2">导演</label>
                    <div className="col-sm-3"> 
                        <Input onChange={(e)=>{
                            const movie=Object.assign({},this.state.movie,{
                                directorId:e.target.value,
                            });
                            this.setState({movie:movie});
                        }}/> 
                    </div>
                    <div className="col-sm-4"><Link to="/director/add">我要新增导演</Link></div>
                </div>
                
                <div className="form-group">
                
                    <label className="col-sm-2">发布日期</label>
                    <div className="col-sm-3"> 
                        <DatePicker onChange={v=>{ 
                            const movie=Object.assign({},this.state.movie,{
                                releaseDate:v,
                            });
                            this.setState({movie:movie});
                        }}/> 
                    </div>                

                    <label className="col-sm-2">别名</label>
                    <div className="col-sm-3"> 
                        <Input onChange={(e)=>{
                            const movie=Object.assign({},this.state.movie,{
                                knownAs:e.target.value,
                            });
                            this.setState({movie:movie});
                        }}/> 
                    </div>

                </div>
                

                <div className="form-group">
                    <label className="col-sm-2">关键词</label>
                    <div className="col-sm-8"> 
                        <Input onChange={(e)=>{
                            const movie=Object.assign({},this.state.movie,{
                                keyWord:e.target.value,
                            });
                            this.setState({movie:movie});
                        }} /> 
                    </div>
                </div>
                
                <div className="form-group">
                    <label className="col-sm-2">描述</label>
                    <div className="col-sm-8"> 
                        <Input type="textarea" rows={4}  onChange={(e)=>{
                            const movie=Object.assign({},this.state.movie,{
                                description:e.target.value,
                            });
                            this.setState({movie:movie});
                        }}/> 
                    </div>
                </div>

                <div className="form-group">
                    <label className="col-sm-2">网站</label>
                    <div className="col-sm-8"> 
                        <Input onChange={(e)=>{
                            const movie=Object.assign({},this.state.movie,{
                                site:e.target.value,
                            });
                            this.setState({movie:movie});
                        }}/> 
                    </div>
                </div>

                <div className="form-group">
                    <label className="col-sm-2">备注</label>
                    <div className="col-sm-8"> 
                        <Input type="textarea" rows={2} onChange={(e)=>{
                            const movie=Object.assign({},this.state.movie,{
                                note:e.target.value,
                            });
                            this.setState({movie:movie});
                        }}/> 
                    </div>
                </div>

                <div className="form-group">
                    <Button type="primary" 
                        disabled={this.state.btnSubmit.disabled} 
                        onClick={()=>{ 
                            // todo: 检查本地状态是否满足条件，是否提交
                            this.setState({
                                modal:{visible:true} 
                            });
                        }}> 
                        提交 
                    </Button>
                    <Modal visible={this.state.modal.visible}
                        onCancel={()=>{
                            this.setState({
                                modal:{visible:false}
                            });
                        }}
                        onOk={()=>{
                            fetch("/movie/add",{
                                method:'POST',
                                headers:{
                                    "Content-Type": 'application/json',
                                },
                                body:JSON.stringify(Object.assign({},this.state.movie))
                            })
                            .then(resp=>resp.json())
                            .then(json=>{
                                let btnSubmit ;
                                if(json.result=="SUCCESS"){
                                    message.success("添加成功");
                                    //上传成功后禁止再次提交同一个片源
                                    btnSubmit = Object.assign({}, this.state.btnSubmit, {
                                        disabled: true,
                                    }); 
                                }else{
                                    message.error("添加失败："+json.message);
                                    btnSubmit = Object.assign({}, this.state.btnSubmit, {
                                        disabled:false,
                                    }); 
                                }
                                this.setState({btnSubmit,modal:{visible:false}});
                            })
                            .catch(e=>{
                                const btnSubmit = Object.assign({}, this.state.btnSubmit, {
                                    disabled: false,
                                });
                                this.setState({btnSubmit,modal:{visible:false}});
                                message.error('异常发生');
                            })
                        }}
                    >
                        请确认是否提交？
                    </Modal>
                </div>
                
            </form>
        </div>);
    }
});

export default Add;


