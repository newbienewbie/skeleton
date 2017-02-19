
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('keyword', {

    tag: {
      type: DataTypes.STRING,
      allowNull: false,
      comment:'关键词',
    },
    postId:{
      type:DataTypes.BIGINT,
      allowNull:false,
      field:'post_id',
      comment:'post id',
    }
  }, {
    tableName: 'keyword'
  });
};