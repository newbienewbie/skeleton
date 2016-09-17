
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('department', {

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue:'active',
    },
    parentId:{
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  }, {
    tableName: 'department'
  });
};
