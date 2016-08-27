
module.exports=function (sequelize,DataType) {
    return sequelize.define(
        "activeCode",
        {
            'code':{
                type:DataType.UUID,
                allowNull:false,
                defaultValue:DataType.UUIDV1,
            },
            'expiresAt':{
                type:DataType.DATE,
                allowNull:false
            }
        },{
            tableName:'activeCode'
        }
    );
}