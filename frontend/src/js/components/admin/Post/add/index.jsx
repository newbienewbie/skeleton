import React from 'react';

import {defaultDecoratedForm,addform} from 'tiny-admin';
import {PlainAddOrEditForm} from '../_common/add-or-edit-form';
import {model} from '../_common/model';


const AddOrEditForm=defaultDecoratedForm.createDecoratedAddOrEditForm(PlainAddOrEditForm);
const AddForm=addform(model,AddOrEditForm);

export class Add extends React.Component{

    constructor(props){
        super(props);
    }

    render() {
        return (<div className="col-sm-9 col-sm-offset-3 col-md-8 col-md-offset-2 main">
            <AddForm />
        </div>);
    }
}