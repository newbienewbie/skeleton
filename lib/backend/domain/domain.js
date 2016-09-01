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

const language=sequelize.import('./entity/language.js');
const country=sequelize.import('./entity/country.js');
const director=sequelize.import('./entity/director.js');
const movie=sequelize.import('./entity/movie.js');
const screenshot=sequelize.import('./entity/screenshot.js');

director.belongsTo(country);
movie.belongsTo(language);
movie.belongsTo(country);
movie.hasMany(screenshot);


user.hasOne(activeCode);



module.exports={
    sequelize:sequelize,
    user:user,
    activeCode:activeCode,
    director:director,
    country:country,
    language:language,
    movie:movie,
};