/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('actor', {
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
    gender: {
      type: DataTypes.CHAR(2),
      allowNull: true
    },
    brithday: {
      type: DataTypes.DATE,
      allowNull: true
    },
    countryId: {
      filed:'country_id',
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    photoUrl: {
      field:'photoUrl',
      type: DataTypes.STRING,
      allowNull: true
    },
    note: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'actor'
  });
};
