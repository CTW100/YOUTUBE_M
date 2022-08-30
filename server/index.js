// npm modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
// custom modules
const config = require('./config/key');
const mainRouter = require('./routers/main');
const userRouter = require('./routers/user');
const videoRouter = require('./routers/video');
const subscribeRouter = require('./routers/subscribe');
const commentRouter = require('./routers/comment');
const likeRouter = require('./routers/like');

mongoose
	.connect(config.mongoURI)
	.then(() => console.log('DB Connected!'))
	.catch((err) => console.log(err));

const app = express();

app.use('/uploads', express.static('uploads'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
	cors({
		origin: 'https://youtube-vmwgf.run.goorm.io',
		credentials: true,
	})
);
app.use(cookieParser());

app.use('/api', mainRouter);
app.use('/api/users', userRouter);
app.use('/api/video', videoRouter);
app.use('/api/subscribe', subscribeRouter);
app.use('/api/comment', commentRouter);
app.use('/api/like', likeRouter);

const port = 8080;
app.listen(port, () => console.log(`Server is running on ${port}`));
