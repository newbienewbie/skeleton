module.exports=(sequelize,DataType)=>{

    return sequelize.define(
        'resource',
        {
            name:{
                type:DataType.STRING,
                field:'name',
                unique:true,
                allowNull:false,
                comment:'资源名，唯一',
            },
            categoryId:{
                type: DataType.INTEGER,
                allowNull:false,
                field:'category_id'
            },
            method:{
                type:DataType.STRING,
                field:'method',
                unique:false,
                allowNull:false,
                comment:'访问资源的方法名，一律大写',
            },
            path:{
                type:DataType.STRING,
                field:'path',
                unique:false,
                allowNull:false,
                comment:'资源路径',
            },
            status:{
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue:'test',
                comment:'状态',    
            },
            description:{
                type:DataType.STRING,   
                comment:'描述',
            }
        },
        {
            tableName:'resource'
        }
    );

};