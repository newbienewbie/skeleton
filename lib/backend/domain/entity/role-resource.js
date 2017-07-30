module.exports=(sequelize,DataType)=>{

    return sequelize.define(
        'roleResource',
        {
            roleId:{
                type:DataType.INTEGER,
                field:'role_id',
                allowNull:false,
                comment:'角色id',
            },
            resourceId:{
                type:DataType.INTEGER,
                field:'resource_id',
                allowNull:false,
                comment:'资源id',
            },
            description:{
                type:DataType.STRING,   
                allowNull:true,
                comment:'描述',
            }
        },
        {
            tableName:'role_resource'
        }
    );

};