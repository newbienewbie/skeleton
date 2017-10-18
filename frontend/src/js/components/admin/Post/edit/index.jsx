import React from 'react';
import UEditor from 'simple-react-ui/dist/ueditor';
import {message} from 'antd';
import {AddOrEditForm} from '../add-or-edit-form/index.jsx';

class Edit extends React.Component{


    render() {
        return (<div className="col-sm-9 col-sm-offset-3 col-md-8 col-md-offset-2 main">
            <AddOrEditForm id={this.props.params.id} initialContent={''} url={'/post/update'} />
        </div>);
    }
}


export default Edit;