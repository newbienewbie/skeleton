module.exports=function(sequelize,DataTypes){
    return sequelize.define(
        'keyword', 
        {
            scope:{
                type: DataTypes.STRING,
                    allowNull: false,
                    defaultValue:'post',
                    field: 'scope',
                    comment:'本分类信息所属的领域，比如post、movie、ebook', 
            },
            topicId:{
                type:DataTypes.BIGINT,
                allowNull:false,
                field:'topic_id',
                comment:'topic id ，比如 postId，ebookId',
            },
            tag: {
                type: DataTypes.STRING,
                allowNull: false,
                comment:'关键词',
            }
        },
        {
            tableName: 'topic_keyword'
        }
    );
}