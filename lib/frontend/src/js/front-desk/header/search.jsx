import React from 'react';
import {Link} from 'react-router' ;


export const Search=React.createClass({
    render:function (params) {
        const inputStyle={
            marginTop:"0.4em",
        };
        return (<div className="col-md-3">
             <input name="search" style={inputStyle} />
        </div>);
    }
});


export default Search;