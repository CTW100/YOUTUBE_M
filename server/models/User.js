const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

const userSchema = mongoose.Schema({
	username: { type: String, required: true, maxlength: 20 },
	password: { type: String, required: true },
	email: { type: String, required: true, trim: true },
	image: String,
	token: String,
	tokenExp: Number,
});

userSchema.pre('save', function (next) {
	var user = this;

	if (user.isModified('password')) {
		bcrypt.genSalt(saltRounds, function (err, salt) {
			if (err) {
				console.log(err);
				return next(err);
			}

			bcrypt.hash(user.password, salt, function (err, hash) {
				if (err) return next(err);
				user.password = hash;
				next();
			});
		});
	} else {
		next();
	}
});

// userSchema.pre('save', function (next) {
// 	const user = this;

// 	if (!user.isModified('password')) {
// 		return next();
// 	} else {
// 		user.password = bcrypt.hash(user.password);
// 		return next();
// 	}
// });

userSchema.methods.comparePassword = function (plainPassword, callback) {
	const user = this;

	bcrypt.compare(plainPassword, user.password, (err, isMatch) => {
		if (err) return callback(err);
		callback(null, isMatch);
	});
};

userSchema.methods.generateToken = function (callback) {
	const user = this;

	// jsonwebtoken을 이용해서 토큰 생성
	const token = jwt.sign(user._id.toHexString(), 'secretToken');
	// user._id + 'secretToken' = token 을 통해 토큰 생성
	// 토큰 해석을 위해 'secretToken' 입력 -> user._id 가 나옴
	// 토큰을 가지고 누구인지 알 수 있는 것
	user.token = token;

	user.save(function (err, user) {
		if (err) return callback(err);
		callback(null, user);
	});
};

userSchema.statics.findByToken = function (token, callback) {
	var user = this;

	jwt.verify(token, 'secretToken', function (err, decoded) {
		// 유저 아이디를 이용해서 유저를 찾은 다음에
		// 클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인
		user.findOne({ _id: decoded, token: token }, function (err, user) {
			if (err) return callback(err);
			callback(null, user);
		});
	});
};

const User = mongoose.model('user', userSchema);
module.exports = User;
