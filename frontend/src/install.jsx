import React from 'react';
import ReactDOM from 'react-dom';
import {Router,Route,IndexRoute,hashHistory} from 'react-router';
import Install from './js/install/components';



ReactDOM.render(
    (<Router history={hashHistory}>
        <Route path="/" component={Install.Main}>
            <IndexRoute component={Install.Home}/>
        </Route>
    </Router>),
    document.querySelector("#container")
);