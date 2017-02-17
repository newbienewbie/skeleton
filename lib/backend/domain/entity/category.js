/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('category', {
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			field: 'name',
			comment:'分类名',
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
