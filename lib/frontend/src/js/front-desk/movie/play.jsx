import React from 'react';
import 'whatwg-fetch';
import Comment from '../comment/index';
import {Pagination} from 'simple-react-ui/dist/pagination';

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
        const loadComments=this.fetchCommentList(1,8,{})
            .then((result)=>{
                const {comments,total}=result;
                this.setState({comments,total});
            });
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
            return Promise.all([loadMovie,loadComments]);
        }
    },

    /**
     * helper 方法，用于生成主题ID
     * @param {Integer} movieId 影片ID
     * @return {String} topicId  主题ID
     */
    _getTopicId(movieId){
        return `movie-${movieId}`;
    },

    fetchCommentList(page=1,size=8,condition={}){
        return fetch(`/comment/list`,{
            method:'post',
            credentials:'same-origin',
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({
                topicId:this._getTopicId(this.props.params.id),
                page,
                size,
            }),
        })
        .then(resp=>resp.json())
        .then(result=>{
            const comments=result.rows.map(c=>{
                c.author.name=c.author.username;
                return c;
            });
            const total=result.count;
            return {comments,total};
        });
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
                <Comment.CommentForm author={{avatarUrl:'#'}} onSubmit={value=>{
                    fetch(`/comment/new`,{
                        method:'post',
                        credentials:'same-origin',
                        headers:{
                            'Content-Type':'application/json',
                        },
                        body:JSON.stringify({
                            content:value,
                            topicId:this._getTopicId(this.props.params.id),
                            page:1,
                            size:this.state.size,
                        })
                    })
                    .then(resp=>resp.json())
                    .then(info=>{
                        console.log(info);
                        return this.fetchCommentList();
                    }).then((result)=>{
                        const {comments,total}=result;
                        this.setState({comments,total});
                    });
                }} />
                <Comment.CommentList comments={this.state.comments}/>
                <Pagination current={this.state.page} size={this.state.size} total={this.state.total} 
                    onChange={(page)=>{
                        this.fetchCommentList(page,this.state.size)
                            .then(result=>{
                                const {comments,total}=result;
                                this.setState({ comments,total,page });
                            });
                    }}
                />
            </div>
        </div>);
    }
});





module.exports = Play;