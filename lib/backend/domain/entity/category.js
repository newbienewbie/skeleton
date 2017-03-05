/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('category', {
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			field: 'name',
			comment:'分类名',
		},
		domain:{
			type: DataTypes.STRING,
			allowNull: false,
			defaultValue:'post',
			field: 'domain',
			comment:'本分类信息所属的领域，比如post、movie、book',
		},
		note: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'note',
			comment:'备注',
		}
	}, {
		tableName: 'category'
	});
};
