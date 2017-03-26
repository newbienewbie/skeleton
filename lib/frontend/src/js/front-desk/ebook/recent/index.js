import React from 'react';
import Pagination from 'simple-react-ui/dist/pagination';
import 'whatwg-fetch';
import {List} from '../list';



const Recent=React.createClass({

    render:function () {
        return (<List categoryId={this.props.params.categoryId}/>);
    }
});


export default Recent;