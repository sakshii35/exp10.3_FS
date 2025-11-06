const { Model, DataTypes } = require('sequelize');


class Like extends Model {
static initModel(sequelize) {
Like.init({
id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
postId: { type: DataTypes.UUID, allowNull: false },
userId: { type: DataTypes.UUID, allowNull: false }
}, { sequelize, modelName: 'like' });
}
}


module.exports = Like;
