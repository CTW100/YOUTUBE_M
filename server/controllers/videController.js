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

exports.uploadVideo = (req, res) => {
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
};
