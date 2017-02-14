import React from 'react';
import ReactDOM from 'react-dom';
import {Router,Route,hashHistory,IndexRoute} from 'react-router';
import Admin from './js/admin/admin.jsx';


ReactDOM.render(
    (<Router history={hashHistory}>
        <Route path="/" component={Admin.Main}>
            <Route path="/movie" component={Admin.Movie.Main} > 
                <IndexRoute component={Admin.Movie.Home}/>
                <Route path="/movie/add" component={Admin.Movie.Add}></Route>
            </Route>
            <Route path="/director" component={Admin.Director.Main}>
                <IndexRoute component={Admin.Director.Home} />
                <Route path="/director/add" component={Admin.Director.Add}></Route>
            </Route>
            <Route path="/post" component={Admin.Post.Main}>
                <IndexRoute component={Admin.Post.Add}/>
                <Route path="/post/add" component={Admin.Post.Add}></Route>
                <Route path="/post/edit" component={Admin.Post.Edit}></Route>
                <Route path="/post/list" component={Admin.Post.List}></Route>
            </Route>
            <Route path="/user" component={Admin.User.Main}>
                <IndexRoute component={Admin.User.Home} />
                <Route path="/user/list" component={Admin.User.List} ></Route>
                <Route path="/user/invite" component={Admin.User.Invite} ></Route>
            </Route>
        </Route>
    </Router>),
    document.getElementById('app')
);