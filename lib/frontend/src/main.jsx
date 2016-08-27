import React from 'react';
import ReactDOM from  'react-dom';
import {Router,Route,hashHistory,IndexRoute} from 'react-router';
import App from './js/front-desk/front-desk.jsx';

ReactDOM.render(
    (<Router history={hashHistory}>
        <Route path="/" component={App.Main}>
            <IndexRoute component={App.Home}/>
            <Route path="/about" component={App.About}></Route>
            <Route path="/post" component={App.Post.Main}>
                <IndexRoute component={App.Post.Home} />
                <Route path="/post/detail/:id" component={App.Post.Detail}/>
            </Route>
            <Route path="/movie" component={App.Movie.Main}>
                <IndexRoute component={App.Movie.Home}/>
            </Route>
        </Route>
    </Router>),
    document.getElementById("App")
 );