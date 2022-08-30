const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dislikeSchema = mongoose.Schema(
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

const Dislike = mongoose.model('dislike', dislikeSchema);
module.exports = Dislike;
