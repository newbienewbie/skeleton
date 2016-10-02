import React from 'react';
import 'whatwg-fetch';

const SearchBar=React.createClass({

    getDefaultProps:function(){
        return {};
    },

    getInitialState:function(){
        return {};
    },
    
    render:function(){
        return(
        <div className="row">
            <form className="form-inline">
                <div className="form-group">
                    <label htmlFor="exampleInputName2">Name</label>
                    <input type="text" className="form-control" placeholder=""/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail2">Email</label>
                    <input type="email" className="form-control" placeholder=""/>
                </div>
                <button type="submit" className="btn btn-default">搜!</button>
            </form>
        </div>);
    }
});


export default SearchBar;