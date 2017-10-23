module.exports = function(sequelize, DataTypes) {
    return sequelize.define(
        "activeCode",
        {
            'code':{
                type:DataTypes.UUID,
                allowNull:false,
                defaultValue:DataTypes.UUIDV1,
            },
            'expiresAt':{
                type:DataTypes.DATE,
                allowNull:false
            },
        },{
            tableName:'activeCode'
        }
    );
};
  