import React from 'react';
import UEditor from 'simple-react-ui/dist/ueditor';
import 'whatwg-fetch';
import {message} from 'antd';
import {AddOrEditForm} from '../add-or-edit-form/index.jsx';

const Edit=React.createClass({


    render:function () {
        return (<div>
            <AddOrEditForm id={this.props.params.id} initialContent={''} url={'/ebook/edit'} />
        </div>);
    }
});


export default Edit;