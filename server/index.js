// npm modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// custom modules
const config = require('./config/key');
const mainRouter = require('./routers/main');
const userRouter = require('./routers/user');
// const cors = require('cors');

mongoose
	.connect(config.mongoURI)
	.then(() => console.log('DB Connected!'))
	.catch((err) => console.log(err));

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(cors());

app.use('/api', mainRouter);
app.use('/api/users', userRouter);

const port = 8080;
app.listen(port, () => console.log(`Server is running on ${port}`));
