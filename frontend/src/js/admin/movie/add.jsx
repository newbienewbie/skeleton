import React from 'react';
import {Row,Col,Modal,InputNumber,Form,Input,Select,DatePicker,Upload,Button,message} from 'antd';
import {Link} from 'react-router';
import 'whatwg-fetch'; 

import SelectStuff from '../utils/select-stuff.jsx';
import UploadAttachment from '../upload-attachment.jsx';
import CategorySelector from './category-selector.jsx';

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
            modal:{visible:false,confirmLoading:false},
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
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        return (
        <div>
            <Form  horizontal >
                <Form.Item label="名称" help="电影名称" {...formItemLayout} >
                    <Input onChange={(e) => {
                        const movie = Object.assign({}, this.state.movie, {
                            title: e.target.value,
                        });
                        this.setState({ movie: movie });
                    } }/>
                </Form.Item>
                <Form.Item label="分类" help="分类" {...formItemLayout} >
                    <CategorySelector value={this.state.movie.categoryId} onChange={(value)=>{
                        const movie=Object.assign({},this.state.movie,{categoryId:value});
                        this.setState({movie:movie});
                    }} />
                </Form.Item>
                <Form.Item label="上传电影"  {...formItemLayout} >
                    <UploadAttachment action="/upload/meiying/video?action=uploadvideo"
                        onChange={(fileList) => {
                            if (fileList && fileList[0].response && fileList[0].response.url) {
                                const movie = Object.assign({}, this.state.movie, {
                                    url: fileList[0].response.url,
                                });
                                const btnSubmit = Object.assign({}, this.state.btnSubmit, {
                                    disabled: false,
                                });
                                this.setState({ movie, btnSubmit }, () => {
                                    console.log(`附件更新：${this.state.movie.url}`)
                                });
                            }
                        } }
                        />
                </Form.Item>

                <Form.Item label="海报" help="如果您不上传，系统将为您自动截取" {...formItemLayout} >
                    <UploadAttachment action="/upload/meiying/image?action=uploadimage"
                        onChange={(info) => {
                            if (!info.file.response) {
                                return;
                            }
                            const movie = Object.assign({}, this.state.movie, {
                                posterUrl: info.file.response.url,
                            });
                            this.setState({ movie });
                        } }
                        />
                </Form.Item>


                <Form.Item label="语言" help="电影语言" {...formItemLayout} >
                    <SelectStuff remoteUrl="/language/list"
                        convert={(json) => {
                            return json.map(i => {
                                return { k: i.id, v: i.lang, };
                            });
                        } }
                        onChange={(v) => {
                            const movie = Object.assign({}, this.state.movie, {
                                languageId: v,
                            });
                            this.setState({ movie: movie });
                        } }
                        />
                </Form.Item>

                <Form.Item label="国家" help="电影发行国家" {...formItemLayout} >
                    <SelectStuff
                        notFoundContent="暂未收录该国家，请选择：其他"
                        remoteUrl="/country/list"
                        convert={(json) => {
                            return json.map(i => {
                                return { k: i.id, v: i.name, };
                            });
                        } }
                        onChange={(v) => {
                            const movie = Object.assign({}, this.state.movie, {
                                countryId: v,
                            });
                            this.setState({ movie: movie });
                        } }
                        />
                </Form.Item>

                <Form.Item label="导演"  {...formItemLayout} >
                    <Col span={16}>
                        <Input onChange={(e) => {
                            const movie = Object.assign({}, this.state.movie, {
                                directorId: e.target.value,
                            });
                            this.setState({ movie: movie });
                        } }/>
                    </Col>
                    <Col span={8}><Link to="/director/add">我要新增导演</Link> </Col>
                </Form.Item>

                <Form.Item label="发布日期"  {...formItemLayout} >
                    <DatePicker onChange={v => {
                        const movie = Object.assign({}, this.state.movie, {
                            releaseDate: v,
                        });
                        this.setState({ movie: movie });
                    } }/>
                </Form.Item>

                <Form.Item label="电影别名"  {...formItemLayout} >
                    <Input onChange={(e) => {
                        const movie = Object.assign({}, this.state.movie, {
                            knownAs: e.target.value,
                        });
                        this.setState({ movie: movie });
                    } }/>
                </Form.Item>

                <Form.Item label="关键词"  {...formItemLayout} >
                    <Input onChange={(e) => {
                        const movie = Object.assign({}, this.state.movie, {
                            keyWord: e.target.value,
                        });
                        this.setState({ movie: movie });
                    } } />
                </Form.Item>

                <Form.Item label="描述"  {...formItemLayout} >
                    <Input type="textarea" rows={4}  onChange={(e) => {
                        const movie = Object.assign({}, this.state.movie, {
                            description: e.target.value,
                        });
                        this.setState({ movie: movie });
                    } }/>
                </Form.Item>

                <Form.Item label="网站"  {...formItemLayout} >
                    <Input onChange={(e) => {
                        const movie = Object.assign({}, this.state.movie, {
                            site: e.target.value,
                        });
                        this.setState({ movie: movie });
                    } }/>
                </Form.Item>

                <Form.Item label="备注"  {...formItemLayout} >
                    <Input type="textarea" rows={2} onChange={(e) => {
                        const movie = Object.assign({}, this.state.movie, {
                            note: e.target.value,
                        });
                        this.setState({ movie: movie });
                    } }/>
                </Form.Item>
               
                <Form.Item wrapperCol={{ span: 16, offset: 8 }} style={{ marginTop: 24 }}>
                    <Button type="primary"
                        disabled={this.state.btnSubmit.disabled}
                        onClick={() => {
                            // todo: 检查本地状态是否满足条件，是否提交
                            this.setState({
                                modal: { visible: true }
                            });
                        } }>
                        提交
                    </Button>
                    <Modal visible={this.state.modal.visible}
                        confirmLoading={this.state.modal.confirmLoading}
                        onCancel={() => {
                            this.setState({
                                modal: { visible: false, confirmLoading: false }
                            });
                        } }
                        onOk={() => {
                            this.setState({
                                modal: { visible: true, confirmLoading: true }
                            });
                            fetch("/movie/add", {
                                method: 'POST',
                                headers: {
                                    "Content-Type": 'application/json',
                                },
                                credentials: 'same-origin',
                                body: JSON.stringify(Object.assign({}, this.state.movie))
                            })
                                .then(resp => resp.json())
                                .then(json => {
                                    let btnSubmit;
                                    if (json.result == "SUCCESS") {
                                        message.success("添加成功");
                                        //上传成功后禁止再次提交同一个片源
                                        btnSubmit = Object.assign({}, this.state.btnSubmit, {
                                            disabled: true,
                                        });
                                    } else {
                                        message.error("添加失败：" + json.message);
                                        btnSubmit = Object.assign({}, this.state.btnSubmit, {
                                            disabled: false,
                                        });
                                    }
                                    this.setState({ btnSubmit, modal: { visible: false, confirmLoading: false } });
                                })
                                .catch(e => {
                                    const btnSubmit = Object.assign({}, this.state.btnSubmit, {
                                        disabled: false,
                                    });
                                    this.setState({ btnSubmit, modal: { visible: false, confirmLoading: false } });
                                    message.error('异常发生');
                                })
                        } }
                        >
                        请确认是否提交？
                    </Modal>
                </Form.Item>
            </Form>
        </div>
        );
    }
});

export default Add;


