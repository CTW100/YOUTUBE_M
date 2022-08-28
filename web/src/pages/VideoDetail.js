import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom'; // history를 사용하기 위해서
import { List, Avatar, Row, Col } from 'antd';
import axios from 'axios';
import SideVideo from '../components/SideVideo';
import Subscribe from '../components/Subscribe';

function VideoDetail(props) {
	const videoId = props.match.params.videoId;

	const [video, setVideo] = useState([]);

	const videoVariable = {
		videoId: videoId,
	};

	useEffect(() => {
		axios
			.post(
				'https://youtube-api.run.goorm.io/api/video/getVideo',
				videoVariable
			)
			.then((response) => {
				if (response.data.success) {
					console.log(response.data.video);
					setVideo(response.data.video);
				} else {
					alert('Failed to get video Info');
				}
			});
	}, []);

	if (video.writer) {
		return (
			<Row>
				<Col lg={18} xs={24}>
					<div
						className='postPage'
						style={{ width: '100%', padding: '3rem 4em' }}
					>
						<video
							style={{ width: '100%' }}
							src={`https://youtube-api.run.goorm.io/${video.filePath}`}
							controls
						></video>

						<List.Item
							actions={[
								<Subscribe
									userFrom={localStorage.getItem('userId')}
									userTo={video.writer && video.writer._id}
								/>,
							]}
						>
							<List.Item.Meta
								avatar={
									<Avatar
										src={video.writer && video.writer.image}
									/>
								}
								title={
									<a href='https://ant.design'>
										{video.title}
									</a>
								}
								description={video.description}
							/>
							<div></div>
						</List.Item>
					</div>
				</Col>
				<Col lg={6} xs={24}>
					<SideVideo />
				</Col>
			</Row>
		);
	} else {
		return <div>...loading</div>;
	}
}

export default withRouter(VideoDetail);
