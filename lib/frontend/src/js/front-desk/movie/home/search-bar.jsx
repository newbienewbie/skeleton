import React from 'react';
import 'whatwg-fetch';

const SearchBar=React.createClass({

    
    render:function(){
        return(
        <div className="row">
            快速检索
            <div className="input-group">
                <input type="text" className="form-control" placeholder="Search for..."/>
            </div>

            <div className="input-group">
                <input type="text" className="form-control" placeholder="Search for..."/>
            </div>
        </div>);
    }
});


export default SearchBar;