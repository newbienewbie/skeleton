import React from 'react';
import ReactDOM from 'react-dom';
import { renderAdminReactDOM } from "./admin-helper";



renderAdminReactDOM();

/*
<Route path="/" component={Admin.Main}>
<Route path="/ebook" component={Admin.Ebook.Main} > 
    <IndexRoute component={Admin.Ebook.Home}/>
    <Route path="/ebook/add" component={Admin.Ebook.Add}></Route>
    <Route path="/ebook/edit/:id" component={Admin.Ebook.Edit}></Route>
    <Route path="/ebook/list" component={Admin.Ebook.List}></Route>
</Route>
<Route path="/movie" component={Admin.Movie.Main} > 
    <IndexRoute component={Admin.Movie.Home}/>
    <Route path="/movie/add" component={Admin.Movie.Add}></Route>
    <Route path="/movie/list" component={Admin.Movie.List}></Route>
</Route>
<Route path="/post" component={Admin.Post.Main}>
    <IndexRoute component={Admin.Post.Add}/>
    <Route path="/post/add" component={Admin.Post.Add}></Route>
    <Route path="/post/edit/:id" component={Admin.Post.Edit}></Route>
    <Route path="/post/list" component={Admin.Post.List}></Route>
</Route>
<Route path="/user" component={Admin.User.Main}>
    <IndexRoute component={Admin.User.Home} />
    <Route path="/user/list" component={Admin.User.List} ></Route>
    <Route path="/user/invite" component={Admin.User.Invite} ></Route>
</Route>
<Route path="/role" component={Admin.Role.Main}>
    <Route path="/role/list" component={Admin.Role.List} ></Route>
    <Route path="/role/create" component={Admin.Role.Add} ></Route>
</Route>
<Route path="/resource" component={Admin.Resource.Main}>
    <Route path="/resource/list" component={Admin.Resource.List} ></Route>
    <Route path="/resource/create" component={Admin.Resource.Add} ></Route>
</Route>
</Route>
*/