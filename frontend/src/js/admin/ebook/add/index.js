import React from 'react';
import UEditor from 'simple-react-ui/dist/ueditor';
import 'whatwg-fetch';
import {message} from 'antd';
import {AddOrEditForm} from '../add-or-edit-form/index.jsx';

const Add=React.createClass({

    render:function () {
        return (<div>
            <AddOrEditForm url={"/ebook/new"} initialContent={''} />
        </div>);
    }
});


export default Add;