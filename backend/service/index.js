const categoryService=require('./common/category');
const topicUserOpinion=require('./common/topic-user-opinion');
const KeywordService=require('./common/keyword');


const ebookService=require('./cms/ebook');
const postService=require('./cms/post');
const movieService=require('./cms/movie');


module.exports={
    categoryService,
    topicUserOpinion,
    KeywordService,
    ebookService,
    postService,
    movieService,
};