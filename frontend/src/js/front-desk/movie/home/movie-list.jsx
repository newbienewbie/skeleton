import React from 'react';
import {Link} from 'react-router';

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
            <Link to={`/movie/play/${props.id}`}  state={{
                url:props.url,
                title:props.title,
                content:props.content,
                posterUrl:props.posterUrl
            }}>
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
            </Link>
        </div>
        <div >
            <Link to={`/movie/play/${props.id}`}  state={{
                url:props.url,
                title:props.title,
                content:props.content,
                posterUrl:props.posterUrl
            }}>
                <h4 className="media-heading" style={{
                    "textAlign":'center',
                    marginTop:'0.2em',
                }}>{props.title}</h4>
            </Link>
            <Link to={`/movie/search/keyword`}>
                <div>{props.keyWord}</div>
            </Link>
            <Link to={`/movie/play/${props.id}`}  state={{
                url:props.url,
                title:props.title,
                content:props.content,
                posterUrl:props.posterUrl
            }}>
                <div>
                    {props.content}
                </div>
            </Link>
        </div>
    </div>);
};

_Media.defaultProps={
    href:'',
    posterUrl:'',
    url:'',
    title:'',
    keyWord:'',
    content:'',
};



const MovieList=(props)=>{
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
                        id={i.id} key={i.id} posterUrl={i.posterUrl|| "#"} 
                        title={i.title} content={i.description} 
                        url={i.url} keyWord={i.keyWord}
                    />);
                })}
            </div>);
        })}
    </div>);
};

MovieList.defaultProps={
    dataSource: [
        {id:'',imageSrc:'',title:'xxxxxxxx',content:'cccccccc',keyWord:''}
    ],
};



export default MovieList;