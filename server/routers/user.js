const express = require('express');
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

const router = express.Router();

// 회원가입 : POST && api/users/register
router.post('/register', userController.registerUser);

// 로그인 : POST && api/users/login
router.post('/login', userController.login);

// auth 인증 : GET && api/users/auth
router.get('/auth', auth, userController.auth);

// 로그아웃 : GET && api/users/logout
router.get('/logout', auth, userController.logout);

module.exports = router;
