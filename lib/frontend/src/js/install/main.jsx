import React from 'react';
import Home from './home.jsx';


const Main=(props)=>{
    return (<div> 
        {props.children}
    </div>);
};

export default {Main,Home};