const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');


class User extends Model {
static initModel(sequelize) {
User.init({
id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
name: { type: DataTypes.STRING, allowNull: false },
email: { type: DataTypes.STRING, allowNull: false, unique: true },
password: { type: DataTypes.STRING, allowNull: false },
avatarUrl: { type: DataTypes.STRING },
bio: { type: DataTypes.TEXT }
}, { sequelize, modelName: 'user' });


User.beforeCreate(async (user) => {
const salt = await bcrypt.genSalt(10);
user.password = await bcrypt.hash(user.password, salt);
});
}
}


module.exports = User;
