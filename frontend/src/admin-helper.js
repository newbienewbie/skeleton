import React from 'react';
import ReactDOM from 'react-dom';
import {Router,Route,hashHistory,IndexRoute} from 'react-router';
import Admin from './js/components/admin/admin.jsx';
require('es6-promise').polyfill();

export const AdminComponent=Admin;

export function adminRoute(routeRule={props:{path:'',component:{},indexComponent:{}},children:[]}){
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

export const defaultRouteRules={
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


export function renderAdminReactDOM(routeRules=defaultRouteRules){
    return ReactDOM.render(
        (<Router history={hashHistory}>
            {adminRoute(routeRules)}
        </Router>),
        document.getElementById('app')
    );
}

