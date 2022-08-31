import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Subscribe(props) {
	const userTo = props.userTo;
	const userFrom = props.userFrom;

	// props
	// userFrom={localStorage.getItem('userId')}
	// userTo={video.writer && video.writer._id}

	const [subscribeNumber, setSubscribeNumber] = useState(0);
	const [subscribed, setSubscribed] = useState(false);

	const onSubscribeHandler = () => {
		let subscribeVariables = {
			userTo: userTo,
			userFrom: userFrom,
		};

		if (subscribed) {
			// when we are already subscribed
			axios
				.post('/api/subscribe/unSubscribe', subscribeVariables)
				.then((response) => {
					if (response.data.success) {
						setSubscribeNumber(subscribeNumber - 1);
						setSubscribed(!subscribed);
					} else {
						alert('Failed to unsubscribe');
					}
				});
		} else {
			// when we are not subscribed yet
			axios
				.post('/api/subscribe/subscribe', subscribeVariables)
				.then((response) => {
					if (response.data.success) {
						setSubscribeNumber(subscribeNumber + 1);
						setSubscribed(!subscribed);
					}
				});
		}
	};

	useEffect(() => {
		const subscribeNumberVariables = {
			userTo: props.userTo,
			userFrom: props.userFrom,
		};

		axios
			.post('/api/subscribe/subscribeNumber', subscribeNumberVariables)
			.then((response) => {
				if (response.data.success) {
					setSubscribeNumber(response.data.subscribeNumber);
				} else {
					alert('Failed to get subscribe Number');
				}
			});

		axios
			.post('/api/subscribe/subscribed', subscribeNumberVariables)
			.then((response) => {
				if (response.data.success) {
					setSubscribed(response.data.subscribed);
				} else {
					alert('Failed to get subscribed information');
				}
			});
	}, []);

	return (
		userTo !== userFrom && (
			<div>
				<button
					onClick={onSubscribeHandler}
					style={{
						backgroundColor: `${
							subscribed ? '#AAAAAA' : '#CC0000'
						}`,
						borderRadius: '4px',
						color: 'white',
						padding: '10px 16px',
						fontWeight: '500',
						fontSize: '1rem',
						textTransform: 'uppercase',
					}}
				>
					{subscribeNumber} {subscribed ? 'Subscribed' : 'Subscribe'}
				</button>
			</div>
		)
	);
}

export default Subscribe;
