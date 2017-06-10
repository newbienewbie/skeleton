let env=process.env.NODE_ENV;
if(env=="production" || env=="prod"){
    env="prod";
}else{
    env="dev";
}

module.exports=require(`./config.${env}.js`);