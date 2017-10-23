module.exports = function(sequelize, DataTypes) {
    return sequelize.define(
        'resource',
        {
            id:{
                type:DataTypes.INTEGER,
                primaryKey:true,
                autoIncrement: true,
                comment:'资源id',
            },
            name:{
                type:DataTypes.STRING,
                field:'name',
                allowNull:false,
                comment:'资源名，唯一',
            },
            categoryId:{
                type: DataTypes.INTEGER,
                allowNull:false,
                field:'category_id',
                comment:'资源分类号，可用于资源的层级管理',
            },
            method:{
                type:DataTypes.STRING,
                field:'method',
                allowNull:false,
                comment:'访问资源的方法名，一律大写',
            },
            path:{
                type:DataTypes.STRING,
                field:'path',
                allowNull:false,
                comment:'资源路径',
            },
            description:{
                type:DataTypes.STRING,   
                comment:'描述',
            },
            status:{
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue:'test',
                comment:'状态',    
            },
        },
        {
            tableName:'resource'
        }
    );
    
};
  