import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { withRouter } from 'react-router-dom'; // history를 사용하기 위해서
import DropZone from 'react-dropzone';
import axios from 'axios';

function Register(props) {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [privacy, setPrivacy] = useState(1);
	const [category, setCategory] = useState('Vlog');

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

	const onSubmitHandler = (event) => {};

	const onDrop = (files) => {
		let formData = new FormData();
		const config = {
			header: { 'content-type': 'multipart/form-data' },
		};
		console.log(files);
		formData.append('file', files[0]);

		axios
			.post('/api/video/uploadfiles', formData, config)
			.then((response) => {
				if (response.data.uploadSuccess) {
					let variables = {
						filePath: response.data.filePath,
						fileName: response.data.fileName,
					};
					setFilePath(response.data.filePath);

					// generate thumbnail with this filepath
				} else {
					alert('failed to save the video on server');
				}
			});
	};

	return (
		<Form onSubmit={onSubmitHandler}>
			<div style={{ display: 'flex', justifyContent: 'space-between' }}>
				<Dropzone onDrop={onDrop} multiple={false} maxSize={800000000}>
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
							<Icon type='plus' style={{ fontSize: '3rem' }} />
						</div>
					)}
				</Dropzone>
				{/* {thumbnail !== "" &&
                    <div>
                        <img src={`http://localhost:5000/${thumbnail}`} alt="haha" />
                    </div>
                } */}
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

			<Button variant='primary' type='submit'>
				Submit
			</Button>
		</Form>
	);
}

export default withRouter(Register);
