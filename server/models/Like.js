const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likeSchema = mongoose.Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: 'user',
		},
		commendId: {
			type: Schema.Types.ObjectId,
			ref: 'comment',
		},
		videoId: {
			type: Schema.Types.ObjectId,
			ref: 'video',
		},
	},
	{ timestamps: true }
);

const Like = mongoose.model('like', likeSchema);
module.exports = Like;
