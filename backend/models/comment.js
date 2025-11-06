const { Model, DataTypes } = require('sequelize');


class Comment extends Model {
static initModel(sequelize) {
Comment.init({
id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
postId: { type: DataTypes.UUID, allowNull: false },
authorId: { type: DataTypes.UUID, allowNull: false },
text: { type: DataTypes.TEXT, allowNull: false }
}, { sequelize, modelName: 'comment' });
}
}


module.exports = Comment;
