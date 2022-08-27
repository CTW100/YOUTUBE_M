const express = require('express');
const router = express.Router();
const multer = require('multer');
const User = require('../models/User');

//https://victorydntmd.tistory.com/39
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'uploads/');
	},
	filename: (req, file, cb) => {
		cb(null, `${Date.now()}_${file.originalname}`);
	},
	fileFilter: (req, file, cb) => {
		const ext = path.extname(file.originalname);
		if (ext !== '.mp4') {
			return cb(res.status(400).end('only mp4 is allowed'));
		}
		cb(null, true);
	},
});

const upload = multer({ storage: storage }).single('file');

//=================================
//             User
//=================================

// 비디오 업로드 : GET && /api/video/uploadfiles
router.get(
	'/uploadfiles',
	(req, res) => {
		upload(req, res, (err) => {
			if (err) {
				return res.json({ uploadSuccess: false, err });
			}
			return res.json({
				uploadSuccess: true,
				filePath: res.req.file.path,
				fileName: res.req.file.fileName,
			});
		});
	}

	// res.req.file.path
	// https://www.inflearn.com/course/%EB%94%B0%EB%9D%BC%ED%95%98%EB%A9%B0-%EB%B0%B0%EC%9A%B0%EB%8A%94-%EB%85%B8%EB%93%9C-%EB%A6%AC%EC%95%A1%ED%8A%B8-%EC%9C%A0%ED%8A%9C%EB%B8%8C-%EB%A7%8C%EB%93%A4%EA%B8%B0/unit/29593?tab=community&category=questionDetail&q=31515
	// upload"로" 들어오는 req 에서 file.path 를 찾아 upload"의" res로 돌려줌
	// 물론 res.json 에서 res 는 exports.uploadVideo = (req, res) => ~ 에서의 res임
);

module.exports = router;
