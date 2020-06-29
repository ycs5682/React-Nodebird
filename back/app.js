const express = require('express');
const postRouter = require('./routes/post');
const db = require('./models');
const app = express();

db.sequelize.sync()
	.then(() => {
		console.log('db接続成功');
	})
	.catch(console.error);

app.get('/', (req, res) => {
	res.send('hello express');
});

app.use('/post', postRouter);

app.listen(3065, () => {
	console.log('サーバー実行中!');
});