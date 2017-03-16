
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('keyword', {

    tag: {
      type: DataTypes.STRING,
      allowNull: false,
      comment:'关键词',
    },
    topicId:{
      type:DataTypes.BIGINT,
      allowNull:false,
      field:'topic_id',
      comment:'topic id ，比如 postId，ebookId',
    }
  }, {
    tableName: 'keyword'
  });
};