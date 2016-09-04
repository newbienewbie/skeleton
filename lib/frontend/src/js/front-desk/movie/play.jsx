import React from 'react';



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
        return {cache};
    },

    /**
     * 如果客户是通过视频列表点击来访问，则通过location.state进行传递参数，避免向服务端再次请求。
     * 如果客户直接在该地址栏中输入URL进行访问（而不是通过首页点击进来的），可以从服务端请求数据
     */
    componentDidMount:function(){
        if(this.state.cache && this.state.cache.url && this.state.cache.title){
            return;
        }else{
            fetch(`/movie/detail/${this.props.params.id}`)
                .then(resp=>resp.json())
                .then(movie=>{
                    this.setState({
                        cache:{
                            title:movie.title,
                            content:movie.description,
                            posterUrl:movie.posterUrl,
                            url:movie.url,
                        }
                    });
                })
                .catch(e=>{
                    alert('加载视频信息失败');
                    console.log(e);
                });
        }
    },

    render: function () {
        const cache = this.state.cache;
        const url = cache.url;
        return (<div>
            <div className="row">
                <h2>{cache.title}</h2>
            </div>
            <video width="640" height="360" controls poster={cache.posterUrl}>
                <source src={url} type="video/mp4" />
                <source src={url} type="video/ogg" />
                <object width="640" height="360" type="application/x-shockwave-flash" data="__FLASH__.SWF">
                    <param name="movie" value="__FLASH__.SWF" />
                    <param name="flashvars" value={`controlbar=over&amp;image=__POSTER__.JPG&amp;file=${url}`} />
                    <img src="__VIDEO__.JPG" width="640" height="360" alt="__TITLE__"
                        title="No video playback capabilities, please download the video below" />
                </object>
            </video>
            <div className="row">
                <a target="_blank" href={url}>下载到本地</a>
            </div>
            <div className="row">
                <h5>简介</h5>{cache.content}
            </div>
        </div>);

    }
});





module.exports = Play;