import React, { useEffect, useState } from 'react';
import { withRouter, Link } from 'react-router-dom'; // history를 사용하기 위해서
import axios from 'axios';
import ListCard from '../components/ListCard';

function Main() {
	const [videos, setVideos] = useState([]);

	useEffect(() => {
		axios
			.get('https://youtube-api.run.goorm.io/api/video/getVideos')
			.then((response) => {
				if (response.data.success) {
					console.log(response.data.success);
					setVideos(response.data.videos);
				} else {
					alert('Failed to get Videos');
				}
			});
	}, []);

	const renderCards = videos.map((video, index) => {
		const minutes = Math.floor(video.duration / 60);
		const seconds = Math.floor(video.duration - minutes * 60);

		return (
			<Link to={`/video/${video._id}`} key={index}>
				<ListCard
					title={video.title}
					description={video.description}
					thumbnail={video.thumbnail}
					writer={video.writer.name}
					views={video.views}
					createdAt={video.createdAt}
					minutes={minutes}
					seconds={seconds}
				/>
			</Link>
		);
	});

	return (
		<div style={{ width: '85%', margin: '3rem auto' }}>
			<h1 level={2}> Recommended </h1>
			<hr />

			{renderCards}
		</div>
	);
}

export default withRouter(Main);
