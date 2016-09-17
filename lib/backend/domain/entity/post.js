
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('post', {

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field:'author_id',
    },
    departmentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field:'department_id',
    },
    colId: {
      type: DataTypes.INTEGER,
      allowNull:false,
      field:'col_id'
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue:'draft',
      comment:'状态：draft，censoring，published,banned',
    }
  }, {
    tableName: 'post'
  });
};
