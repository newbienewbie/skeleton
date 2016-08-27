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



user.hasOne(activeCode);



module.exports={
    sequelize:sequelize,
    user:user,
    activeCode:activeCode,
};