module.exports = function(sequelize, DataTypes) {
    return sequelize.define(
        'role',
        {
            id:{
                type:DataTypes.INTEGER,
                primaryKey:true,
                autoIncrement: true,
                comment:'角色id',
            },
            name:{
                type:DataTypes.STRING,
                field:'name',
                unique:true,
                allowNull:false,
                comment:'角色名，唯一，用人类语言描述的角色名',
            },
            description:{
                type:DataTypes.TEXT,   
                comment:'角色描述',
            }
        },
        {
            tableName:'role'
        }
    );
};
  