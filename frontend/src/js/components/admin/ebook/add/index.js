import React from 'react';
import UEditor from 'simple-react-ui/dist/ueditor';
import {message} from 'antd';
import {AddOrEditForm} from '../add-or-edit-form/index.jsx';

export class Add extends React.Component{

    render() {
        return (<div>
            <AddOrEditForm url={"/ebook/new"} initialContent={''} />
        </div>);
    }
}


export default Add;