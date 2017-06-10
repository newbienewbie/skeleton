import React from 'react';
import {Category} from './category';

export const Aside=React.createClass({
    render:function () {
        return <aside>
            <div>recent post</div>
            <Category />
            <div>archives</div>
        </aside>;
    }
});


export default Aside;