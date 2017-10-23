/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('language', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    lang: {
      type: DataTypes.STRING,
      allowNull: false
    },
    note: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'language'
  });
};
