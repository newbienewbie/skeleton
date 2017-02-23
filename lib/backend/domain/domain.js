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

director.belongsTo(country);
movie.belongsTo(language);
movie.belongsTo(country);
movie.hasMany(screenshot);

post.belongsTo(category);
post.belongsTo(user,{foreignKey:'author_id',as:'author'});
post.hasMany(keyword,{foreignKey:'post_id'});
post.hasMany(comment,{foreignKey:'topic_id',});

// comment.belongsTo(comment,{foreignKey:'reply_to'});

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
};