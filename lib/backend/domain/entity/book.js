/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('book', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      comment:'书名',
    },
    author: {
      field:'author',
      type: DataTypes.STRING,
      allowNull: false,
      comment:'作者',
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      comment:'描述',
    },
    isbn: {
      field:"isbn",
      type: DataTypes.STRING,
      allowNull: true,
      comment:'ISBN，之所以可以留空，是考虑到有些非出版的电子书没有ISBN',
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
      comment:'上传者ID',
    }
  }, {
    tableName: 'book'
  });
};
