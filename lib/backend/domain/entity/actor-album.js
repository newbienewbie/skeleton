/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('actor_album', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    actorIid: {
      field:'actor_id',
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'actor',
        key: 'id'
      }
    },
    photo_url: {
      type: DataTypes.STRING,
      allowNull: true
    },
    weight: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'actor_album'
  });
};
