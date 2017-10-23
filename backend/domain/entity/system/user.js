module.exports = function(sequelize, DataTypes) {
    return sequelize.define(
        'user',
        {
            username:{
                type:DataTypes.STRING,
                unique:true,
                allowNull:false,
            },
            email:{
                type:DataTypes.STRING,
                unique:true,
                allowNull:false,
            },
            password:{
                type:DataTypes.STRING,
                allowNull:false,
            },
            state:{
                type:DataTypes.STRING,   
                defaultValue:'frozen',
                comment:'frozen:冻结、active:激活、shutup:禁言，banned:放逐',
            }
        },
        {
            tableName:'user'
        }
    );
};
  