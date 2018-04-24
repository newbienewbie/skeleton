import React from 'react';
import ReactDOM from 'react-dom';
import {Router,Route,hashHistory,IndexRoute} from 'react-router';
import Admin from './js/components/admin/admin.jsx';
require('es6-promise').polyfill();

function adminRoute(routeRule={props:{path:'',component:{},indexComponent:{}},children:[]}){
    if(!routeRule) return null;
    if ( routeRule.children && routeRule.children.length >0){
        return (
            <Route key={"route-"+routeRule.props.path} path={routeRule.props.path} component={routeRule.props.component}>
                {
                    routeRule.props.indexComponent?
                    (<IndexRoute component={Admin.Ebook.Home}/>):
                     null
                }
                {
                    routeRule.children.map((r,i)=>{
                        return adminRoute(r);
                    })
                }
            </Route>
        );
    }else {
        return <Route key={"route-"+routeRule.props.path} path={routeRule.props.path} component={routeRule.props.component}></Route>;
    }
}

const defaultRouteRules={
    props:{
        path:'/',
        component:Admin.Main,
    },
    children:[
        {
            props:{  name:'ebook', path:'/ebook', component: Admin.Ebook.Main, indexComponent: Admin.Ebook.Main },
            children:[
                {
                    props:{ path:'/ebook/add', component: Admin.Ebook.Add, },
                },
                {
                    props:{ path:'/ebook/edit/:id', component: Admin.Ebook.Edit, },
                },
                {
                    props:{ path:'/ebook/list', component: Admin.Ebook.List, },
                },
            ],
        },
        {
            props:{ name:'movie', path:'/movie', component: Admin.Movie.Main, indexComponent: Admin.Movie.Main },
            children:[
                {
                    props:{ path:'/movie/add', component: Admin.Movie.Add, },
                },
                {
                    props:{ path:'/movie/list', component: Admin.Movie.List, },
                },
            ],
        },
        {
            props:{  name:'post', path:'/post', component: Admin.Post.Main, indexComponent: Admin.Post.Main },
            children:[
                {
                    props:{ path:'/post/add', component: Admin.Post.Add, },
                },
                {
                    props:{ path:'/post/edit/:id', component: Admin.Post.Edit, },
                },
                {
                    props:{ path:'/post/list', component: Admin.Post.List, },
                },
            ],
        },
        {
            props:{  name:'user', path:'/user', component: Admin.User.Main, indexComponent: Admin.User.Home},
            children:[
                {
                    props:{ path:'/user/invite', component: Admin.User.Invite, },
                },
                {
                    props:{ path:'/user/list', component: Admin.User.List, },
                },
            ],
        },
        {
            props:{  name:'role', path:'/role', component: Admin.Role.Main, indexComponent: Admin.Role.Main},
            children:[
                {
                    props:{ path:'/role/create', component: Admin.Role.Add, },
                },
                {
                    props:{ path:'/role/list', component: Admin.Role.List, },
                },
            ],
        },
        {
            props:{  name:'resource', path:'/resource', component: Admin.Resource.Main, indexComponent: Admin.Resource.Main},
            children:[
                {
                    props:{ path:'/resource/list', component: Admin.Resource.List, },
                },
                {
                    props:{ path:'/resource/create', component: Admin.Resource.Add, },
                },
            ],
        },
    ],
};

ReactDOM.render(
    (<Router history={hashHistory}>
        {adminRoute(defaultRouteRules)}
    </Router>),
    document.getElementById('app')
);

export default {
    Admin,
};


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