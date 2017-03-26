import React from 'react';
import ReactDOM from  'react-dom';
import {Router,Route,hashHistory,IndexRoute} from 'react-router';
import App from './js/front-desk/front-desk.jsx';
require('es6-promise').polyfill();

ReactDOM.render(
    (<Router history={hashHistory}>
        <Route path="/" component={App.Main}>
            <IndexRoute component={App.Home}/>
            <Route path="/about" component={App.About}></Route>
            <Route path="/post" component={App.Post.Main}>
                <IndexRoute component={App.Post.Home} />
                <Route path="/post/detail/:id" component={App.Post.Detail}/>
            </Route>
            <Route path="/ebook" component={App.Ebook.Main}>
                <IndexRoute component={App.Ebook.Home}/>
                <Route path="/ebook/recent/:categoryId" component={App.Ebook.Recent}></Route>
                <Route path="/ebook/detail/:id" component={App.Ebook.Detail}/>
            </Route>
            <Route path="/movie" component={App.Movie.Main}>
                <IndexRoute component={App.Movie.Home}/>
                <Route path="/movie/play/:id" component={App.Movie.Play}/>
            </Route>
            <Route path="/contact" component={App.Contact}></Route>
        </Route>
    </Router>),
    document.getElementById("App")
 );