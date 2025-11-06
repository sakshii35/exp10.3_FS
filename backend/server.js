require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
const { sequelize: seq, User, Post } = require('./models');


const app = express();
app.use(cors());
app.use(express.json());


app.use('/api/auth', require('./routes/auth'));
app.use('/api/posts', require('./routes/posts'));


const PORT = process.env.PORT || 5000;


async function start() {
try {
await sequelize.authenticate();
await sequelize.sync();
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
} catch (err) { console.error(err); }
}
start();  
