
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('col', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descritpion: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    parent:{
      type:DataTypes.BIGINT,
      allowNull:false,
    }
  }, {
    tableName: 'col'
  });
};
