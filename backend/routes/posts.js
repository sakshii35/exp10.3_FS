const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { Post, User, Like, Comment } = require('../models');
const { upload } = require('../services/s3');


// get feed
router.get('/', async (req, res) => {
const posts = await Post.findAll({ include: [{ model: User, as: 'author', attributes: ['id', 'name', 'avatarUrl'] }], order: [['createdAt', 'DESC']] });
res.json(posts);
});


// create post (with image optional)
router.post('/', auth, upload.single('image'), async (req, res) => {
const { text } = req.body;
const imageUrl = req.file ? req.file.location : null;
const post = await Post.create({ authorId: req.user.id, text, imageUrl });
res.status(201).json(post);
});


// like/unlike
router.post('/:id/like', auth, async (req, res) => {
const postId = req.params.id;
const existing = await Like.findOne({ where: { postId, userId: req.user.id } });
if (existing) {
await existing.destroy();
return res.json({ liked: false });
}
await Like.create({ postId, userId: req.user.id });
res.json({ liked: true });
});


module.exports = router;
