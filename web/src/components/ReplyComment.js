import React, { useState, useEffect } from 'react';
import SingleComment from './SingleComment';

function ReplyComment(props) {
	const [childCommentNumber, setChildCommentNumber] = useState(0);
	const [openReplyComments, setOpenReplyComments] = useState(true);

	useEffect(() => {
		let commentNumber = 0;

		props.commentLists.map((comment) => {
			if (comment.responseTo === props.parentCommentId) {
				commentNumber++;
			}
		});
		setChildCommentNumber(commentNumber);
	}, [props.commentLists, props.parentCommentId]);

	let renderReplyComment = (parentCommentId) =>
		props.commentLists.map((comment, index) => (
			<React.Fragment key={index}>
				{comment.responseTo === parentCommentId && (
					<div style={{ width: '80%', marginLeft: '40px' }}>
						<SingleComment
							comment={comment}
							postId={props.postId}
							refreshFunction={props.refreshFunction}
						/>
						<ReplyComment
							commentLists={props.commentLists}
							parentCommentId={comment._id}
							postId={props.postId}
							refreshFunction={props.refreshFunction}
						/>
					</div>
				)}
			</React.Fragment>
		));

	console.log(renderReplyComment(props.parentCommentId));

	const handleChange = () => {
		setOpenReplyComments(!openReplyComments);
	};

	console.log(openReplyComments);

	return (
		<div>
			{childCommentNumber > 0 && (
				<p
					style={{ fontSize: '14px', margin: 0, color: 'gray' }}
					onClick={handleChange}
				>
					View {childCommentNumber} more comment(s)
				</p>
			)}

			{/* {openReplyComments && renderReplyComment(props.parentCommentId)} */}
			{renderReplyComment(props.parentCommentId)}
		</div>
	);
}

export default ReplyComment;
