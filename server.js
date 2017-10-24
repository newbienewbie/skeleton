/**
 * default running method 
 * useful for debug
 */


const defaultConfig=require('./config');
const Skeleton=require('./index.js');

/**
 * 创建skeleton
 */
const skeleton=new Skeleton({
    config:defaultConfig
});

skeleton.run();