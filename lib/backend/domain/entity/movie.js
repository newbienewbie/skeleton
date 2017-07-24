/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('movie', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true
    },
    knownAs: {
      field:"known_as",
      type: DataTypes.STRING,
      allowNull: true
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull:false,
      field:'category_id'
    },
    languageId: {
      field:'language_id',
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    director: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    runtime: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    aspectRatio: {
      field:'aspect_ratio',
      type: DataTypes.STRING,
      allowNull: true
    },
    site: {
      type: DataTypes.STRING,
      allowNull: true
    },
    releaseDate: {
      field:'release_date',
      type: DataTypes.DATE,
      allowNull: true
    },
    countryId: {
      field:'country_id',
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    posterUrl: {
      field:'poster_url',
      type: DataTypes.STRING,
      allowNull: true
    },
    url:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    uploaderId:{
      type:DataTypes.INTEGER,
      allowNull:false,
      defaultValue:'-1',
    },
    status:{
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue:'draft',
      comment:'状态：draft，censoring，published,banned',
    },
    publishedAt:{
      type:DataTypes.DATE,
      allowNull:true,
      filed:'published_at',
      comment:'即发布者提交的发布日期，有可能需要后续审核，不同于创建的首次保存日期', 
    }
  }, {
    tableName: 'movie'
  });
};
