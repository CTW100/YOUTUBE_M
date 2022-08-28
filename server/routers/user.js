const express = require('express');
const auth = require('../middleware/auth');
const User = require('../models/User');
const router = express.Router();

// 회원가입 : POST && api/users/register
router.post('/register', (req, res) => {
	User.create(req.body, (err, user) => {
		if (err) {
			console.log(err);
			return res.json({ err: err, registerSuccess: false });
		}
		return res.status(200).json({
			registerSuccess: true,
		});
	});
});

// 로그인 : POST && api/users/login
router.post('/login', (req, res) => {
	User.findOne({ username: req.body.username }, (err, user) => {
		if (!user) {
			return res.json({
				loginSuccess: false,
				message: '해당 username에 해당하는 유저가 없습니다',
			});
		}

		// 비밀번호 비교
		user.comparePassword(req.body.password, (err, isMatch) => {
			if (!isMatch) {
				return res.json({
					loginSuccess: false,
					message: '비밀번호가 틀렸습니다',
				});
			}

			// 토큰 생성
			user.generateToken((err, user) => {
				if (err) return res.status(400).send(err);

				// 정상적일 경우 토큰을 쿠키나 로컬스토리지 등에 저장
				// 쿠키에 저장
				res.cookie('x_auth', user.token).status(200).json({
					loginSuccess: true,
					userId: user._id,
					token: user.token,
				});
			});
		});
	});
});

// auth 인증 : GET && api/users/auth
router.get('/auth', auth, (req, res) => {
	// 여기까지 미들웨어(auth.js)를 통과해 왔다는 얘기는 Authentication이 True라는 말
	// 클라이언트에게 유저 정보 전달
	res.status(200).json({
		_id: req.user._id,
		isAuth: true,
		email: req.user.email,
	});
});

// 로그아웃 : GET && api/users/logout
router.get('/logout', auth, (req, res) => {
	User.findOneAndUpdate({ _id: req.user._id }, { token: '' }, (err, user) => {
		if (err) {
			console.log(err);
			return res.json({ logoutSuccess: false, err });
		}
		return res.status(200).send({
			logoutSuccess: true,
		});
	});
});

module.exports = router;
