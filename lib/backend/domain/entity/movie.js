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
    keyWord: {
      field:'key_word',
      type: DataTypes.STRING,
      allowNull: true
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
  }, {
    tableName: 'movie'
  });
};
