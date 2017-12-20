const passwordService=require('./account/password-service');
const roleService=require('./account/role-service');
const resourceService=require('./account/resource-service');
const signupService=require('./account/signup-service');
const userService=require('./account/user-service');

const emailService=require('./email');

const installService=require('./install');


const categoryService=require('./common/category');
const topicUserOpinion=require('./common/topic-user-opinion');
const KeywordService=require('./common/keyword');
const intercepter=require('./common/authorization-checker');


const ebookService=require('./cms/ebook');
const postService=require('./cms/post');
const movieService=require('./cms/movie');

const commentService=require('./comment');
const utils=require('./utils');


module.exports={
    passwordService,
    roleService,
    resourceService,
    signupService,
    userService,
    emailService,
    emailService,
    categoryService,
    topicUserOpinion,
    KeywordService,
    intercepter,
    ebookService,
    postService,
    movieService,
    commentService,
    installService,
    utils,
};