import React from 'react';
import {Article} from './article.jsx';;
import {Comment}  from 'react-comment';
import Pagination from 'simple-react-ui/dist/pagination';
import 'whatwg-fetch';


const Detail=React.createClass({

    render:function () {
        return (<div>
            <Article id={this.props.params.id}/>
            <Comment topicId={this.props.params.id} />
        </div>);
    }
});

export default Detail;
