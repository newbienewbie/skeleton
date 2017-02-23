import React from 'react';
import {Article} from './article.jsx';;
import {Comments} from './comment/index.jsx';


const Detail=React.createClass({
    render:function () {
        return (<div>
            <Article id={this.props.params.id}/>
            <Comments/>
        </div>);
    }
});

export default Detail;