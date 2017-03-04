/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('topicUserOpinion', {
		topicId: {
			type: DataTypes.STRING,
			allowNull: false,
			field: 'topic_id',
			comment:'评论ID',
		},
		userId: {
			type: DataTypes.BIGINT,
			allowNull: false,
			field: 'user_id',
			comment:'用户ID',
		},
		opinion: {
			type: DataTypes.STRING,
			allowNull: false,
			field: 'opinion',
			comment:'意见，字符串：赞同、感谢、反对、无益'
		},
		note: {
			type: DataTypes.TEXT,
			allowNull: true,
			field: 'note',
			comment:'备注',
		}
	}, {
		tableName: 'topic_user_opinion'
	});
};
