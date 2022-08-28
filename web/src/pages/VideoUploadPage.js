import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { withRouter } from 'react-router-dom'; // history를 사용하기 위해서
import { PlusOutlined } from '@ant-design/icons';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { useSelector } from 'react-redux';

function VideoUploadPage(props) {
	const user = useSelector((state) => state.user);

	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [privacy, setPrivacy] = useState(1);
	const [category, setCategory] = useState('Vlog');
	const [duration, setDuration] = useState('');
	const [thumbnail, setThumbnail] = useState('');

	const [filepath, setFilePath] = useState('');

	const onTitleHandler = (event) => {
		setTitle(event.target.value);
	};

	const onDescriptionHandler = (event) => {
		setDescription(event.target.value);
	};

	const onPravacyHandler = (event) => {
		setPrivacy(event.target.value);
	};

	const onCategoryHandler = (event) => {
		setCategory(event.target.value);
	};

	const onSubmitHandler = (event) => {
		event.preventDefault();

		if (user.userData && !user.userData.isAuth) {
			return alert('Please login first!');
		}

		if (
			title === '' ||
			description === '' ||
			category === '' ||
			duration === '' ||
			filepath === '' ||
			thumbnail === ''
		) {
			return alert('Please first fill all the fields');
		}

		const variables = {
			writer: user.userData._id,
			title: title,
			description: description,
			privacy: privacy,
			filePath: filepath,
			category: category,
			duration: duration,
			thumbnail: thumbnail,
		};

		axios
			.post(
				'https://youtube-api.run.goorm.io/api/video/uploadVideo',
				variables,
				{ withCredentials: true }
			)
			.then((response) => {
				if (response.data.success) {
					alert('Video Uploaded Successfully');
					props.history.push('/');
				} else {
					alert('Failed to upload video');
				}
			});
	};

	const onDrop = (files) => {
		let formData = new FormData();
		const config = {
			header: { 'content-type': 'multipart/form-data' },
		};
		console.log('files: ', files);
		formData.append('file', files[0]);
		console.log('formData.file ', formData.file);
		axios
			.post(
				'https://youtube-api.run.goorm.io/api/video/uploadfiles',
				formData,
				config
			)
			.then((response) => {
				console.log('response.data: ', response.data);
				if (response.data.uploadSuccess) {
					let variable = {
						filePath: response.data.filePath,
						fileName: response.data.fileName,
					};
					setFilePath(response.data.filePath);

					//gerenate thumbnail with this filepath !

					axios
						.post(
							'https://youtube-api.run.goorm.io/api/video/thumbnail',
							variable
						)
						.then((response) => {
							if (response.data.success) {
								setDuration(response.data.fileDuration);
								setThumbnail(response.data.thumbsFilePath);
							} else {
								alert('Failed to make the thumbnails');
							}
						});
				} else {
					alert('failed to save the video in server');
				}
			});
	};

	return (
		<div style={{ maxWidth: '700px', margin: '2rem auto' }}>
			<Form onSubmit={onSubmitHandler}>
				<div
					style={{ display: 'flex', justifyContent: 'space-between' }}
				>
					<Dropzone
						onDrop={onDrop}
						multiple={false}
						maxSize={8000000000}
					>
						{({ getRootProps, getInputProps }) => (
							<div
								style={{
									width: '300px',
									height: '240px',
									border: '1px solid lightgray',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
								}}
								{...getRootProps()}
							>
								<input {...getInputProps()} />
								<PlusOutlined style={{ fontSize: '3rem' }} />
							</div>
						)}
					</Dropzone>
					{thumbnail !== '' && (
						<div>
							<img
								src={`https://youtube-api.run.goorm.io/${thumbnail}`}
								alt='thumbnail'
							/>
						</div>
					)}
				</div>
				<Form.Group className='mb-3' controlId='formBasicTitle'>
					<Form.Label>Title</Form.Label>
					<Form.Control
						type='text'
						placeholder='Enter Title'
						onChange={onTitleHandler}
					/>
				</Form.Group>

				<Form.Group className='mb-3' controlId='formBasicDescription'>
					<Form.Label>Description</Form.Label>
					<Form.Control
						type='text'
						placeholder='Description'
						onChange={onDescriptionHandler}
					/>
				</Form.Group>
				<Form.Select
					aria-label='Default select example'
					onChange={onPravacyHandler}
				>
					<option>Privacy</option>
					<option value='1'>Public</option>
					<option value='2'>Private</option>
				</Form.Select>
				<Form.Select
					aria-label='Default select example'
					onChange={onCategoryHandler}
				>
					<option>Category</option>
					<option value='1'>Vlog</option>
					<option value='2'>Film and Drama</option>
					<option value='3'>Music</option>
					<option value='4'>Variety</option>
				</Form.Select>

				<Button
					variant='primary'
					type='submit'
					onClick={onSubmitHandler}
				>
					Submit
				</Button>
			</Form>
		</div>
	);
}

export default withRouter(VideoUploadPage);
