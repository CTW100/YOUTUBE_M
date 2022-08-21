const express = require('express');
const router = express.Router();
const videoController = require('');

router.get('/uploadfiles', videoController.uploadVideo);

module.exports = router;
