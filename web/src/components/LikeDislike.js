import React, { useEffect, useState } from 'react';
import { Tooltip } from 'antd';
import {
	LikeOutlined,
	DislikeOutlined,
	LikeFilled,
	DislikeFilled,
} from '@ant-design/icons';
import axios from 'axios';

function LikeDislike(props) {
	const [likes, setLikes] = useState(0);
	const [dislikes, setDislikes] = useState(0);
	const [likeAction, setLikeAction] = useState(null);
	const [dislikeAction, setDislikeAction] = useState(null);

	let variables = {};

	if (props.video) {
		variables = { videoId: props.videoId, userId: props.userId };
	} else {
		variables = { commentId: props.commentId, userId: props.userId };
	}

	useEffect(() => {
		axios
			.post('https://youtube-api.run.goorm.io/api/like/getLikes')
			.then((response) => {
				console.log('getLikes', response.data);

				if (response.data.success) {
					// How many likes does this video or comment have
					setLikes(response.data.likes.length);

					// If I already click this like button or not
					response.data.likes.map((like) => {
						if (like.userId === props.userId) {
							setLikeAction('liked');
						}
					});
				} else {
					alert('Failed to get dislikes');
				}
			});

		axios
			.post(
				'https://youtube-api.run.goorm.io/api/like/getDislikes',
				variables
			)
			.then((response) => {
				console.log('getDislikes', response.data);

				if (response.data.success) {
					// How many dislikes does this video or comment have
					setDislikes(response.data.dislikes.length);

					// If I already click this like button or not
					response.data.dislikes.map((dislike) => {
						if (dislike.userId === props.userId) {
							setDislikeAction('disliked');
						} else {
							alert('Failed to get dislikes');
						}
					});
				}
			});
	}, []);

	const onLike = () => {
		if (likeAction === null) {
			axios
				.post(
					'https://youtube-api.run.goorm.io/api/like/upLike',
					variables
				)
				.then((response) => {
					if (response.data.success) {
						setLikes(likes + 1);
						setLikeAction('liked');

						// if dislike button is already cliecked
						if (dislikeAction !== null) {
							setDislikeAction('null');
							setDislikes(dislikes - 1);
						}
					} else {
						alert('Failed to increase the like');
					}
				});
		} else {
			axios
				.post(
					'https://youtube-api.run.goorm.io/api/like/unLike',
					variables
				)
				.then((response) => {
					if (response.data.success) {
						setLikes(likes - 1);
						setLikeAction(null);
					} else {
						alert('Failed to decrease the like');
					}
				});
		}
	};

	const onDislike = () => {
		if (dislikeAction !== null) {
			axios
				.post(
					'https://youtube-api.run.goorm.io/api/like/unDislike',
					variables
				)
				.then((response) => {
					if (response.data.success) {
						setDislikes(dislikes - 1);
						setDislikeAction(null);
					} else {
						alert('Failed to decrease dislike');
					}
				});
		} else {
			axios
				.post(
					'https://youtube-api.run.goorm.io/api/like/upDislike',
					variables
				)
				.then((response) => {
					if (response.data.success) {
						setDislikes(dislikes + 1);
						setDislikeAction('disliked');

						// if dislike button is already clicked
						if (likeAction !== null) {
							setLikeAction(null);
							setLikes(likes - 1);
						}
					} else {
						alert('Failed to increase dislike');
					}
				});
		}
	};

	return (
		<React.Fragment>
			<span key='comment-basic-like'>
				<Tooltip title='Like'>
					{likeAction === 'liked' ? (
						<LikeFilled onClick={onLike} />
					) : (
						<LikeOutlined onClick={onLike} />
					)}
				</Tooltip>
				<span style={{ paddingLeft: '8px', cursor: 'auto' }}>
					{likes}
				</span>
			</span>
			&nbsp;&nbsp;
			<span key='comment-basic-dislike'>
				<Tooltip title='Dislike'>
					{dislikeAction === 'disliked' ? (
						<DislikeFilled onClick={onDislike} />
					) : (
						<DislikeOutlined onClick={onDislike} />
					)}
				</Tooltip>
				<span style={{ paddingLeft: '8px', cursor: 'auto' }}>
					{dislikes}
				</span>
			</span>
		</React.Fragment>
	);
}

export default LikeDislike;
