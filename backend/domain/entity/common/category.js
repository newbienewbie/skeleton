module.exports=function(sequelize,DataTypes){
    return sequelize.define('category', 
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                field: 'name',
                comment:'分类名',
            },
            scope:{
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue:'post',
                field: 'scope',
                comment:'本分类信息所属的领域，比如post、movie、book',
            },
            pid:{
                type: DataTypes.BIGINT,
                allowNull: true,
                defaultValue:null,
                field: 'pid',
                comment:'parent id ，可以为null',
            },
            note: {
                type: DataTypes.TEXT,
                allowNull: true,
                field: 'note',
                comment:'备注',
            }
        }, 
        {
            tableName: 'category'
        }
    );
}