import React from 'react';
import 'whatwg-fetch';
import SearchBar from './search-bar.jsx'; 
import MovieList from './movie-list.jsx';
import Pagination from 'simple-react-ui/dist/pagination';



const Home=React.createClass({
    getInitialState:function(){
        return {
            page:1,
            size:12,
            rows:[
                {id:'',imageSrc:'',title:'xxxxxxxx',content:'cccccccc',keyWord:"",}
            ],
            count:50,
            current:1,
        };
    },
    fetchData:function(page=1,size=12,cb=()=>{}){
        fetch(`/movie/list?page=${page}&size=${size}`,{
            credentials: 'same-origin'
        })
        .then(resp => resp.json())
        .then(json => {
            this.setState(
                { count: json.count, rows: json.rows, },
                ()=>{ cb(this.state); }
            );
        })
        .catch(e => {
            console.log("发生异常：", e);
        });
    },
    componentDidMount:function(){
        this.fetchData(this.state.page,this.state.size);
    },
    render:function(){
        return (<div className="container">
            <div className="row">
                <SearchBar />
            </div>
            <div className="row">最新视频</div>
            <div className="row">
                <MovieList dataSource={this.state.rows}/> 
            </div>
            <div className="row">
                <Pagination current={this.state.current}  size={this.state.size} total={this.state.count}
                    onChange={(page)=>{
                        this.setState(
                            { page: page, current: page, },
                            ()=>{
                                this.fetchData(page,this.state.size);
                            }
                        );      
                    }}
                />
            </div>
        </div>);
    }
});

export default Home;