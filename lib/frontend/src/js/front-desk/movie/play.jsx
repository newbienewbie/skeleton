import React from 'react';
import 'whatwg-fetch';
import {Comment} from '../comment/index';

/**
 * 电影的播放页面，相当于文章的详情页面
 */
const Play = React.createClass({

    getInitialState:function(){
        let cache = this.props.location.state;
        if(!cache){
            cache={
                title:'',
                content:'',
                posterUrl:'',
                url:'',
            }
        }
        return {
            cache,
            canplay1:true,
            canplay2:true,
            canplay3:true,
            comments:[
                {id:1,author:{name:'xx1',email:'',avatarUrl:'#',introduction:'一句话掐死你',},content:'balabala',createdAt:new Date(),updatedAt:new Date(),upvotes:0,downvotes:0,},
            ],
            page:1,  // 评论分页：当前页
            total:0, // 评论分页：总条数
            size:8,  // 评论分页：每页大小
        };
    },

    /**
     * 如果客户是通过视频列表点击来访问，则通过location.state进行传递参数，避免向服务端再次请求。
     * 如果客户直接在该地址栏中输入URL进行访问（而不是通过首页点击进来的），可以从服务端请求数据
     */
    componentDidMount:function(){
        if(this.state.cache && this.state.cache.url && this.state.cache.title){
            return;
        }else{
            const loadMovie=fetch(`/movie/detail/${this.props.params.id}`,{
                credentials: 'same-origin'
            })
            .then(resp => resp.json())
            .then(movie => {
                this.setState({
                    cache: {
                        title: movie.title,
                        content: movie.description,
                        posterUrl: movie.posterUrl,
                        url: movie.url,
                    }
                });
            })
            .catch(e => {
                alert('加载视频信息失败');
                console.log(e);
            });
            return loadMovie;
        }
    },

    render: function () {
        const cache = this.state.cache;
        const url = cache.url;

        return ( <div>
            <div className="row">
                <h2>{cache.title}</h2>
            </div>
            <div className="row">
                <div  style={{ position:'relative', margin:'auto'}}>
                    <div className="row" >
                        <video width="100%" controls poster={cache.posterUrl}>
                            <source src={url} type="video/mp4" onError={()=>{
                                this.setState( {canplay1:false} );
                            }} />
                            <source src={url} type="video/ogg" onError={()=>{
                                this.setState( {canplay2:false} ) ;
                            }} />
                            <object
                                type="application/x-shockwave-flash"
                                data="__FLASH__.SWF"
                                onError={()=>{ 
                                    this.setState({ canplay3: false }) 
                                }}
                            >
                                <param name="movie" value="__FLASH__.SWF" />
                                <param name="flashvars" value={`controlbar=over&amp;image=__POSTER__.JPG&amp;file=${url}`} />
                                <img src="__VIDEO__.JPG" width="640" height="360" alt="__TITLE__"
                                    title="No video playback capabilities, please download the video below" />
                            </object>
                        </video>
                    </div>
                    <div className="row" style={{
                        display: this.state.canplay1||this.state.canplay2||this.state.canplay3?"none":"block",
                        position: 'absolute',
                        left:'50%',
                        top: '25%',
                        margin:'auto',
                    }}>
                        <div style={{
                            position: 'relative',
                            left: '-50%',
                            top: '-50%',
                            color: 'red',
                        }}>
                            对不起，该视频不能在您的浏览器上播放，但是您可以
                            <a target="_blank" href={url} style={{ color: 'rgb(140, 240, 16)', }}>下载到本地</a> ，
                            然后使用合适的播放器观看
                        </div>
                    </div>
                </div>
            </div>

            <div className="row">
                <a target="_blank" href={url}>下载到本地</a>
            </div>
            <div className="row">
                <h5>简介</h5>{cache.content}
            </div>
            <div>
                <Comment topicId={this.props.params.id} scope="movie" />
            </div>
        </div>);
    }
});





module.exports = Play;