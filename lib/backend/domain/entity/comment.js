/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('comment', {
		id: {
			type: DataTypes.BIGINT,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		content: {
			type: DataTypes.TEXT,
			allowNull: false,
			field: 'content'
		},
		upvotes: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			defaultValue:0,
			field: 'upvotes',
			comment:'赞同数',
		},
		downvotes: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			defaultValue:0,
			field: 'downvotes',
			comment:'反对数',
		},
		authorId: {
			type: DataTypes.BIGINT,
			allowNull: null,
			field: 'author_id',
			comment:'作者ID',
		},
		topicId: {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'topic_id',
			comment:'主题ID，如文章、电影等',
		},
		replyTo: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			field: 'reply_to',
			comment:'回复的某评论ID',
		}
	}, {
		tableName: 'comment'
	});
};
