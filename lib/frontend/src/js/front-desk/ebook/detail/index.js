import React from 'react';
import Pagination from 'simple-react-ui/dist/pagination';
import 'whatwg-fetch';
import {Ebook} from './ebook';
import {Comment} from '../../comment';


export const Detail=React.createClass({


    render:function () {
        return (<div>
            <Ebook id={this.props.params.id}/>
            <Comment topicId={this.props.params.id} scope="ebook"/>
        </div>);
    }
});

export default Detail;