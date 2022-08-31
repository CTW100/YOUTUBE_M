import React, { useState } from 'react';
import { Button, Input } from 'antd';
import axios from 'axios';
import { useSelector } from 'react-redux';
import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment';

const { TextArea } = Input;

function Comments(props) {
	const user = useSelector((state) => state.user);
	const [comment, setComment] = useState('');

	const onCommentHandler = (event) => {
		setComment(event.target.value);
	};

	const onSubmitHandler = (event) => {
		event.preventDefault();

		const variables = {
			content: comment,
			writer: user.userData._id,
			postId: props.postId,
		};

		axios.post('/api/comment/saveComment', variables).then((response) => {
			if (response.data.success) {
				setComment('');
				props.refreshFunction(response.data.result);
			} else {
				alert('Failed to save Comment');
			}
		});
	};

	return (
		<div>
			<br />
			<p> 댓글</p>
			<hr />
			{/* Comment Lists  */}
			{console.log(props.commentLists)}

			{props.commentLists &&
				props.commentLists.map(
					(comment, index) =>
						!comment.responseTo && (
							<React.Fragment key={index}>
								<SingleComment
									comment={comment}
									postId={props.postId}
									refreshFunction={props.refreshFunction}
								/>
								<ReplyComment
									commentLists={props.commentLists}
									postId={props.postId}
									parentCommentId={comment._id}
									refreshFunction={props.refreshFunction}
								/>
							</React.Fragment>
						)
				)}

			{/* Root Comment Form */}
			<form style={{ display: 'flex' }} onSubmit={onSubmitHandler}>
				<TextArea
					style={{ width: '100%', borderRadius: '5px' }}
					onChange={onCommentHandler}
					value={comment}
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
		</div>
	);
}

export default Comments;
