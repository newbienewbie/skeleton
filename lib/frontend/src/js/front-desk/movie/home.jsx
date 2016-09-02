import React from 'react';
import 'whatwg-fetch';
import _Pagination from './pagination.jsx';

const _movie_list_item_style={
    background:"rgba(59, 128, 10, 0.1)",
};

const _Media=(props)=>{
    return ( <div className="col-md-3">
        <div style={{
             border:'2px orange solid',
             position:'relative',
             margin:0,
             marginTop:'2em',
             padding:0,
             height:'200px',
        }}>
            <a href={`/${props.url}`}>
                <img src={props.posterUrl}  style={{ 
                    display:'inline-block',
                    width:'100%',
                    height:'100%',
                    verticalAlign:'middle',
                }}/>
                <img src="/static/img/播放按钮.png" style={{
                    position:'absolute',
                    left:'50%',
                    top:'50%',
                    margin:'-32px -32px ', /* 播放按钮大小为64*64 */
                }}/>
            </a>
        </div>
        <div >
            <a href={`/${props.url}`}>
                <h4 className="media-heading" style={{
                    "textAlign":'center',
                }}>{props.title}</h4>
                {props.content}
            </a>
        </div>
    </div>);
};

_Media.defaultProps={
    href:'',
    imageSrc:'',
    url:'',
    title:'',
    content:'',
};



const _MovieList=(props)=>{
    const dataSource=props.dataSource;
    const itemsPerRow=4;
    const multirows=new Array();
    for(let i=0;i<dataSource.length;i++){
        let r=parseInt(i / itemsPerRow);
        let c=parseInt(i % itemsPerRow);
        if( ! multirows[r]){
            multirows[r]=[];
        }
        multirows[r][c]=dataSource[i];
    }

    return (<div className="container">
        {multirows.map((row,rowNum)=>{
            return (<div className="row" key={rowNum}>
                {row.map(i=>{
                    return (<_Media 
                        key={i.id} posterUrl={i.posterUrl|| "#"} 
                        title={i.title} content={i.description} 
                        url={i.url}
                    />);
                })}
            </div>);
        })}
    </div>);
};

_MovieList.defaultProps={
    dataSource: [
        {id:'',imageSrc:'',title:'xxxxxxxx',content:'cccccccc'}
    ],
};



const Home=React.createClass({
    getInitialState:function(){
        return {
            page:1,
            size:12,
            rows:[
                {id:'',imageSrc:'',title:'xxxxxxxx',content:'cccccccc'}
            ],
            count:50,
        };
    },
    componentDidMount:function(){
        fetch(`/movie/list?page=${this.state.page}&size=${this.state.size}`)
            .then(resp=>resp.json())
            .then(json=>{
                this.setState({
                    count:json.count,
                    rows:json.rows,
                });
            })
            .catch(e=>{
                console.log("发生异常：",e);
            });
    },
    render:function(){
        return (<div className="container">
            <div className="row">最新视频</div>
            <div className="row">
                <_MovieList dataSource={this.state.rows}/> 
            </div>
            <div className="row">
            </div>
        </div>);
    }
});

export default Home;