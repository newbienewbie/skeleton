import React from 'react';
import 'whatwg-fetch';
import _Pagination from './pagination.jsx';

const _movie_list_item_style={
    background:"rgba(59, 128, 10, 0.1)",
};

const _Media=(props)=>{
    console.log('_Media 接收到 props:',props);
    return ( <div className="col-md-3">
        <div >
            <a href={`/${props.url}`}>
                <img src={props.imageSrc}  style={{ height:271, }}/>
            </a>
        </div>
        <div >
            <a href={`/${props.url}`}>
                <h4 className="media-heading">{props.title}</h4>
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
    return (<div className="container">
        {props.dataSource.map(i=>{
            return (<_Media 
                key={i.id} imageSrc={i.imageSrc|| "#"} 
                heading={i.title} content={i.description} 
                url={i.url}
            />);
        })}
    </div>);
};

_MovieList.defaultProps={
    dataSource: [
        {id:'',imageSrc:'',heading:'xxxxxxxx',content:'cccccccc'}
    ],
};



const Home=React.createClass({
    getInitialState:function(){
        return {
            page:1,
            size:10,
            rows:[
                {id:'',imageSrc:'',heading:'xxxxxxxx',content:'cccccccc'}
            ],
            count:50,
        };
    },
    componentDidMount:function(){
        fetch('/movie/list')
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
            <div className="row">
                <_MovieList dataSource={this.state.rows}/> 
            </div>
            <div className="row">
            </div>
        </div>);
    }
});

export default Home;