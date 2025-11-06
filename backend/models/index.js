const sequelize = require('../config/db');
const User = require('./user');
const Post = require('./post');
const Comment = require('./comment');
const Like = require('./like');


User.initModel(sequelize);
Post.initModel(sequelize);
Comment.initModel(sequelize);
Like.initModel(sequelize);


// Relations
User.hasMany(Post, { foreignKey: 'authorId' });
Post.belongsTo(User, { foreignKey: 'authorId', as: 'author' });
Post.hasMany(Comment, { foreignKey: 'postId' });
Comment.belongsTo(User, { foreignKey: 'authorId', as: 'author' });
Post.hasMany(Like, { foreignKey: 'postId' });
Like.belongsTo(User, { foreignKey: 'userId' });


module.exports = { sequelize, User, Post, Comment, Like };
