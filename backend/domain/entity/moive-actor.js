/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('moive_actor', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    movieId: {
      field:'movie_id',
      type: DataTypes.BIGINT,
      allowNull: true
    },
    actorId: {
      field:'actor_id',
      type: DataTypes.BIGINT,
      allowNull: true
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'moive_actor'
  });
};
