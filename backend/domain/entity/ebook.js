/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ebook', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      comment:'书名',
    },
    author: {
      field:'author',
      type: DataTypes.STRING,
      allowNull: false,
      comment:'作者，注意不是发布人，必填',
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment:'描述，必填',
    },
    isbn: {
      field:"isbn",
      type: DataTypes.STRING,
      allowNull: true,
      comment:'ISBN，之所以可以留空，是考虑到有些非出版的电子书没有ISBN',
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull:false,
      field:'category_id'
    },
    posterUrl: {
      field:'poster_url',
      type: DataTypes.STRING,
      allowNull: true,
      comment:'封皮URL',
    },
    url:{
      type: DataTypes.STRING,
      allowNull: false,
      comment:'文件URL',
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment:'备注',
    },
    uploaderId:{
      type:DataTypes.INTEGER,
      allowNull:false,
      comment:'上传者ID，发布人',
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue:'draft',
      comment:'状态：draft，censoring，published，banned',
    },
  }, {
    tableName: 'ebook'
  });
};
