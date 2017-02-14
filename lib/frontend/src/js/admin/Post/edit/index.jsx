import React from 'react';
import UEditor from 'simple-react-ui/dist/ueditor';
import 'whatwg-fetch';
import {message} from 'antd';
import {AddOrEditForm} from '../add-or-edit-form.jsx';

const Edit=React.createClass({


    render:function () {
        return (<div className="col-sm-9 col-sm-offset-3 col-md-8 col-md-offset-2 main">
            <AddOrEditForm id={this.props.params.id} initialContent={''} url={'/post/edit'} />
        </div>);
    }
});


export default Edit;