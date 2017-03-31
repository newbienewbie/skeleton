const config=require('../config/config.js');
const Sequelize=require('sequelize');



const database=config.database;
const sequelize=new Sequelize(
    database.dbname,
    database.username,
    database.password,
    {
        host:database.host,
        dialect:database.dialect,
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        },
    }
);


const user=sequelize.import('./entity/user.js');
const activeCode=sequelize.import('./entity/active-code.js');
const role=sequelize.import('./entity/role.js');

const language=sequelize.import('./entity/language.js');
const country=sequelize.import('./entity/country.js');
const director=sequelize.import('./entity/director.js');
const movie=sequelize.import('./entity/movie.js');
const screenshot=sequelize.import('./entity/screenshot.js');
const post=sequelize.import('./entity/post.js');
const category=sequelize.import('./entity/category.js');
const keyword=sequelize.import('./entity/keyword.js');
const comment=sequelize.import('./entity/comment.js');
const topicUserOpinion=sequelize.import('./entity/topic-user-opinion.js');

const ebook=sequelize.import('./entity/ebook.js');

director.belongsTo(country);
movie.belongsTo(language);
movie.belongsTo(country);
movie.hasMany(screenshot);

post.belongsTo(category);
post.belongsTo(user,{foreignKey:'author_id',as:'author'});

// 因为 keyword 可能是post、ebook、movie或者其他之类的id，所以要注释掉这句外键关联
// post.hasMany(keyword,{foreignKey:'post_id'});


comment.belongsTo(user,{foreignKey:'author_id',as:'author'});
// comment.belongsTo(comment,{foreignKey:'reply_to'});
//comment.hasMany(topicUserOpinion,{foreignKey:'comment_id'});
topicUserOpinion.belongsTo(user,{foreignKey:'user_id'});

user.hasOne(activeCode);



module.exports={
    sequelize,
    user,
    activeCode,
    director,
    country,
    language,
    movie,
    screenshot,
    role,
    post,
    category,
    keyword,
    comment,
    ebook,
    topicUserOpinion,
};