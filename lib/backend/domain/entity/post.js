
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('post', {

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
    }
    
  }, {
    tableName: 'post'
  });
};
