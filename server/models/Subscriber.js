const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subscriberSchema = mongoose.Schema(
	{
		userTo: {
			type: Schema.Types.ObjectId,
			ref: 'user',
		},
		userFrom: {
			type: Schema.Types.ObjectId,
			ref: 'user',
		},
	},
	{ timestamps: true }
);

const Subscriber = mongoose.model('subscriber', subscriberSchema);
module.exports = Subscriber;
