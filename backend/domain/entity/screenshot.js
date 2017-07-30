/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('screenshot', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    movieId: {
      field:'movie_id',
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: 'movie',
        key: 'id'
      }
    },
    url: {
      type: DataTypes.STRING,
      allowNull: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'screenshot'
  });
};
