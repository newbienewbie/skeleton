import React from 'react';
import Ueditor from './ueditor.jsx';

const Add=React.createClass({

    render:function () {

        return (<div className="col-sm-9 col-sm-offset-3 col-md-8 col-md-offset-2 main">
            <form action="" method='post' className="container" >
                <input name='title'/>
                <Ueditor id="ueditorContainer" name="content" width={800} height={500} />
                <input className="btn btn-warning" type='submit' name="提交" value='提交'/>
            </form>
        </div>);
    }
});


export default Add;