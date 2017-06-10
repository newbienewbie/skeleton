const config=require("../../config").getConfig();
const session=require('express-session');
const sessionStore=require('./session-store.js');


const sess=session({
     key:'snp_session_cookie_name',
     secret:config.sessionSecret,
     store:sessionStore,
     resave: false,
     saveUninitialized: true,
});



module.exports=sess;
