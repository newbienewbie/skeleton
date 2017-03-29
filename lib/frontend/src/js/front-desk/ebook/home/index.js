import React from 'react';
import {List} from '../../entity-list';
import {fetchList} from '../util/fetch-list';
import {entityToItem} from '../util/list-item';


const Home=React.createClass({

    render:function () {
        return (<List
            fetch={fetchList}
            entityToItem={entityToItem}
        />);
    }
});


export default Home;

