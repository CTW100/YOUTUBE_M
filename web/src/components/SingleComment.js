import React, { useState } from 'react';
import { Comment, Avatar, Button, Input } from 'antd';
import axios from 'axios';
import { useSelector } from 'react-redux';
import LikeDislike from './LikeDislike';
const { TextArea } = Input;

function SingleComment(props) {
	const user = useSelector((state) => state.user);

	const [commentValue, setCommentValue] = useState('');
	const [openReply, setOpenReply] = useState(false);

	const onCommentHandler = (event) => {
		setCommentValue(event.target.value);
	};

	const onReplyHandler = () => {
		setOpenReply(!openReply);
	};

	const onSubmitHandler = (event) => {
		event.preventDefault();

		const variables = {
			writer: user.userData._id,
			postId: props.postId,
			responseTo: props.comment._id,
			content: commentValue,
		};

		axios
			.post(
				'https://youtube-api.run.goorm.io/api/comment/saveComment',
				variables
			)
			.then((response) => {
				if (response.data.success) {
					setCommentValue('');
					setOpenReply(!openReply);
					props.refreshFunction(response.data.result);
				} else {
					alert('Failed to save Comment');
				}
			});
	};

	const actions = [
		<LikeDislike
			comment
			commentId={props.comment._id}
			userId={localStorage.getItem('userId')}
		/>,
		<span onClick={onReplyHandler} key='comment-basic-reply-to'>
			Reply to
		</span>,
	];

	return (
		<div>
			<Comment
				actions={actions}
				author={props.comment.writer.name}
				avatar={<Avatar src={props.comment.writer.image} alt='image' />}
				content={<p>{props.comment.content}</p>}
			></Comment>

			{openReply && (
				<form style={{ display: 'flex' }} onSubmit={onSubmitHandler}>
					<TextArea
						style={{ width: '100%', borderRadius: '5px' }}
						onChange={onCommentHandler}
						value={commentValue}
						placeholder='write some comments'
					/>
					<br />
					<Button
						style={{ width: '20%', height: '52px' }}
						onClick={onSubmitHandler}
					>
						Submit
					</Button>
				</form>
			)}
		</div>
	);
}

export default SingleComment;
