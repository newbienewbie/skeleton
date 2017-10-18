import React from 'react';
import UEditor from 'simple-react-ui/dist/ueditor';
import {message} from 'antd';
import {AddOrEditForm} from '../add-or-edit-form/index.jsx';

export class Edit extends React.Component{


    render() {
        return (<div>
            <AddOrEditForm id={this.props.params.id} initialContent={''} url={'/ebook/edit'} />
        </div>);
    }
}


export default Edit;