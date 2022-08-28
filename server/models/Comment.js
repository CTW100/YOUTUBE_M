const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = mongoose.Schema(
	{
		writer: {
			type: Schema.Types.ObjectId,
			ref: 'user',
		},
		postId: {
			type: Schema.Types.ObjectId,
			ref: 'video',
		},
		responseTo: {
			type: Schema.Types.ObjectId,
			ref: 'user',
		},
		content: String,
	},
	{ timestamps: true }
);

const Comment = mongoose.model('comment', commentSchema);
module.exports = Comment;
