import React from 'react';
import 'whatwg-fetch';
import _Pagination from './pagination.jsx';

const _movie_list_item_style={
    background:"rgba(59, 128, 10, 0.1)",
};

const _Media=React.createClass({
    getDefaultProps:function(){
        return {

        };
    },
    render:function(){
        return (<div className="media" style={_movie_list_item_style}>
            <div className="media-left">
                <a href={`/${this.props.url}`}>
                    <img className="media-object" src={`${this.props.imageSrc}`} alt={""}/>
                </a>
            </div>
            <div className="media-body">
                <a href={`/${this.props.url}`}>
                    <h4 className="media-heading">{this.props.heading}</h4>
                    {this.props.content}
                </a>
            </div>
        </div>);
    }
});



const _MovieList=React.createClass({
    getDefaultProps:function(){
        return { page:1, size:10, };
    },
    getInitialState:function(){
        return {
            movieList:[
                {id:'',imageSrc:'',heading:'xxxxxxxx',content:'cccccccc'}
            ],
            count:1,
        };
    },
    componentDidMount:function(){
    
    },
    componentWillReceiveProps:function(nextProps){
    },
    render:function(){
        return (<div className="container">
            {this.state.movieList.map(i=>{
                return (<_Media 
                    key={i.id} imageSrc={i.imageSrc} 
                    heading={i.heading} content={i.content} 
                    url={i.url}
                />);
            })}
        </div>);
    },
});



const Home=React.createClass({
    getInitialState:function(){
        return {page:1,size:10,count:50};
    },
    render:function(){
        return (<div className="container">
            <div className="row">
                <_MovieList page={this.state.page} size={this.state.size} />
            </div>
            <div className="row">
                <_Pagination 
                    totalRecores={this.state.count}
                    onChange={ (i)=>{
                        this.setState({page:i},()=>{
                            console.log(this.state);
                        });
                    } }
                />
            </div>
        </div>);
    }
});

export default Home;