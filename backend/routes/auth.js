const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../models');


// register
router.post('/register', async (req, res) => {
const { name, email, password } = req.body;
const existing = await User.findOne({ where: { email } });
if (existing) return res.status(400).json({ msg: 'Email in use' });
const user = await User.create({ name, email, password });
const token = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET, { expiresIn: '7d' });
res.json({ token });
});


// login
router.post('/login', async (req, res) => {
const { email, password } = req.body;
const user = await User.findOne({ where: { email } });
if (!user) return res.status(400).json({ msg: 'Invalid credentials' });
const isMatch = await bcrypt.compare(password, user.password);
if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });
const token = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET, { expiresIn: '7d' });
res.json({ token });
});


module.exports = router;
