const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
	res.send('메인페이지: 안녕하세요!');
});

module.exports = router;
