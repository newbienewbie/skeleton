import React from 'react';
import Pagination from 'simple-react-ui/dist/pagination';
import 'whatwg-fetch';
import {List} from '../../entity-list';
import {entityToItem} from '../util/list-item';
import {fetchList} from '../util/fetch-list';


export const Recent=React.createClass({

    render:function () {
        return <List 
            categoryId={this.props.params.categoryId} 
            fetch={fetchList}
            entityToItem={entityToItem}
        />;
    }
});


export default Recent;