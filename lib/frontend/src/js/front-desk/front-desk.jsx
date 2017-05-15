import React from 'react';
import Header from './header/index.jsx';
import Footer from  './footer.jsx';

import Home from './home.jsx';
import About from './about.jsx';
import Post from './post/post.jsx';
import Ebook from './ebook';
import Movie from './movie/movie.jsx';
import {Contact} from './contact/index.jsx';
import 'react-comment/dist/style.css';

const Main=React.createClass({
    getDefaultProps:function () {
        return {
        };
    },
    render:function () {
        return (<div className="container">
            <Header/>
            {this.props.children}
            <Footer/>
        </div>);
    }
});


export default {Main,Home,Movie,Post,Ebook,About,Contact};

