// npm modules
const express = require('express');
const router = express.Router();
const multer = require('multer');
const ffmpeg = require('fluent-ffmpeg');
// custom modules
const Video = require('../models/Video');
const Subscriber = require('../models/Subscriber');

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
router.post(
	'/uploadfiles',
	(req, res) => {
		upload(req, res, (err) => {
			if (err) {
				return res.json({ uploadSuccess: false, err });
			}
			console.log('res.req.file: ', res.req.file);
			return res.json({
				uploadSuccess: true,
				filePath: res.req.file.path,
				fileName: res.req.file.filename,
			});
		});
	}

	// res.req.file.path
	// https://www.inflearn.com/course/%EB%94%B0%EB%9D%BC%ED%95%98%EB%A9%B0-%EB%B0%B0%EC%9A%B0%EB%8A%94-%EB%85%B8%EB%93%9C-%EB%A6%AC%EC%95%A1%ED%8A%B8-%EC%9C%A0%ED%8A%9C%EB%B8%8C-%EB%A7%8C%EB%93%A4%EA%B8%B0/unit/29593?tab=community&category=questionDetail&q=31515
	// upload"로" 들어오는 req 에서 file.path 를 찾아 upload"의" res로 돌려줌
	// 물론 res.json 에서 res 는 exports.uploadVideo = (req, res) => ~ 에서의 res임
);

// ffmpeg:  https://velog.io/@nomadhash/TIL-FFmpeg-Node-JS%EB%A1%9C-%EC%98%81%EC%83%81-%EC%8D%B8%EB%84%A4%EC%9D%BC-%EC%83%9D%EC%84%B1%ED%95%98%EA%B8%B0

router.post('/thumbnail', (req, res) => {
	// 썸네일 생성하고 비디오 러닝타임도 가져오기
	let thumbsFilePath = '';
	let fileDuration = '';

	// 비디오 정보 가져오기

	ffmpeg.ffprobe(req.body.filePath, function (err, metadata) {
		console.dir('metadata: ', metadata);
		console.log('metadata.format.duration: ', metadata.format.duration);

		fileDuration = metadata.format.duration;
	});

	// 썸네일 생성
	ffmpeg(req.body.filePath)
		.on('filenames', function (filenames) {
			console.log('Will generate ' + filenames.join(', '));
			thumbsFilePath = 'uploads/thumbnails/' + filenames[0];
		})
		.on('end', function () {
			console.log('Screenshots taken');
			return res.json({
				success: true,
				thumbsFilePath: thumbsFilePath,
				fileDuration: fileDuration,
			});
		})
		.on('error', function (err) {
			console.log(err);
			return res.json({ success: false, err });
		})
		.screenshots({
			// Will take screens at 20%, 40%, 60% and 80% of the video
			count: 1,
			folder: 'uploads/thumbnails',
			size: '320x240',
			// %b input basename ( filename w/o extension )
			filename: 'thumbnail-%b.png',
		});
});

router.post('/uploadVideo', (req, res) => {
	Video.create(req.body, (err, video) => {
		if (err) return res.status(400).json({ sucess: false, err });
		return res.status(200).json({ success: true });
	});
});

router.get('/getVideos', (req, res) => {
	Video.find()
		.populate('writer')
		.exec((err, videos) => {
			if (err) {
				console.log(err);
				return res.status(400).send(err);
			}
			res.status(200).json({ success: true, videos });
		});
});

router.post('/getVideo', (req, res) => {
	Video.findOne({ _id: req.body.videoId })
		.populate('writer')
		.exec((err, video) => {
			if (err) return res.status(400).send(err);
			res.status(200).json({ success: true, video });
		});
});

router.post('/getSubscriptionVideos', (req, res) => {
	Subscriber.find({ userFrom: req.body.userFrom }).exec(
		(err, subscribers) => {
			if (err) return res.status(400).send(err);

			let subscribedUser = [];

			subscribers.map((subscriber, i) => {
				subscribedUser.push(subscriber.userTo);
			});

			// Need to Fetch all of the Videos that belong to the Users that I found in previous step
			// 내가 구독한 유저들이 올린 비디오들을 다 가져옴
			Video.find({ writer: { $in: subscribedUser } })
				.populate('writer')
				.exec((err, videos) => {
					if (err) return res.status(400).send(err);
					res.status(200).json({ success: true, videos });
				});
		}
	);
});

module.exports = router;
