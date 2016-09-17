/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('director', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    birthday: {
      type: DataTypes.DATE,
      allowNull: true
    },
    countryId: {
      field:'country_id',
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    hometown: {
      type: DataTypes.STRING,
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'director'
  });
};
