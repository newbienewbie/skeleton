module.exports=function(sequelize,DataTypes){
    return sequelize.define(
        'post', 
        {
            title: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            slug:{
              type: DataTypes.STRING,
              allowNull: true,
              field:'slug',
              comment:'slug',
            },
            content: {
              type: DataTypes.TEXT,
              allowNull: false,
            },
            excerpt:{
              type:DataTypes.TEXT,
              allowNull:false,
              comment:'摘要',
            },
            featureImageUrl:{
              type: DataTypes.STRING,
              allowNull: true,
              field:'feature_image_url',
              comment:'特色图片URL',
            },
            authorId: {
              type: DataTypes.INTEGER,
              allowNull: true,
              field:'author_id',
            },
            password:{
              type: DataTypes.STRING,
              allowNull: true,
              field:'password',
              comment:'保护密码',
            },
            status: {
              type: DataTypes.STRING,
              allowNull: false,
              defaultValue:'draft',
              comment:'状态：draft，censoring，published,banned',
            },
            departmentId: {
              type: DataTypes.INTEGER,
              allowNull: true,
              field:'department_id',
            },
            categoryId: {
              type: DataTypes.INTEGER,
              allowNull:false,
              field:'category_id'
            },
            publishedAt:{
              type:DataTypes.DATE,
              allowNull:true,
              filed:'published_at',
              comment:'即作者提交的发布日期，有可能需要后续审核，不同于创建的首次保存日期',
            },
            commentable:{
              type:DataTypes.BOOLEAN,
              allowNull:false,
              defaultValue:true,
              field:'commentable',
              comment:'是否可以评论',
            }
            
          },
          {
            tableName: 'post'
          }
    );
}