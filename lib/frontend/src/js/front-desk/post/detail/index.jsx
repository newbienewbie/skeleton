import React from 'react';
import {Article} from './article.jsx';;
import 'whatwg-fetch';



const Comments=React.createClass({
    render:function () {
        return (<div>
            comments 
        </div>);
    }
});


const Detail=React.createClass({
    render:function () {
        return (<div>
            <Article id={this.props.params.id}/>
            <Comments/>
        </div>);
    }
});

export default Detail;