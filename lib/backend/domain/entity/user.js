module.exports=(sequelize,DataType)=>{

    return sequelize.define(
        'user',
        {
            username:{
                type:DataType.STRING,
                unique:true,
                allowNull:false,
            },
            email:{
                type:DataType.STRING,
                unique:true,
                allowNull:false,
            },
            password:{
                type:DataType.STRING,
                allowNull:false,
            },
            roles:{    //当前拥有的角色，JSON字符串
                type:DataType.STRING,
                allowNull:false,
                defaultValue:JSON.stringify([]),
            },
            state:{
                type:DataType.STRING,   
                defaultValue:'frozen',
                comment:'frozen:冻结、active:激活、shutup:禁言，banned:放逐',
            }
        },
        {
            tableName:'user'
        }
    );

};