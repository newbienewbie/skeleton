const categoryService=require('./common/category');
const topicUserOpinion=require('./common/topic-user-opinion');


const ebookService=require('./cms/ebook');
const postService=require('./cms/post');
const movieService=require('./cms/movie');


module.exports={
    categoryService,
    topicUserOpinion,
    ebookService,
    postService,
    movieService,
};