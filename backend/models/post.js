const { Model, DataTypes } = require('sequelize');


class Post extends Model {
static initModel(sequelize) {
Post.init({
id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
authorId: { type: DataTypes.UUID, allowNull: false },
text: { type: DataTypes.TEXT, allowNull: false },
imageUrl: { type: DataTypes.STRING }
}, { sequelize, modelName: 'post' });
}
}


module.exports = Post;
