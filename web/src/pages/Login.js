import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { loginUser } from '../_actions/userAction';
import { withRouter } from 'react-router-dom'; // history를 사용하기 위해서

function Login(props) {
	const dispatch = useDispatch();

	const [username, setUsername] = useState();
	const [password, setPassword] = useState();

	const onUsernameHandler = (event) => {
		setUsername(event.target.value);
	};
	const onPasswordHandler = (event) => {
		setPassword(event.target.value);
	};
	const onSubmitHandler = (event) => {
		event.preventDefault();

		let body = {
			username: username,
			password: password,
		};

		dispatch(loginUser(body)).then((response) => {
			if (response.payload.loginSuccess) {
				window.localStorage.setItem('userId', response.payload.userId);
				props.history.push('/');
			} else {
				alert('Error');
			}
		});
	};

	return (
		<Form onSubmit={onSubmitHandler}>
			<Form.Group className='mb-3' controlId='formBasicUsername'>
				<Form.Label>Username</Form.Label>
				<Form.Control
					type='text'
					placeholder='Enter username'
					onChange={onUsernameHandler}
				/>
			</Form.Group>

			<Form.Group className='mb-3' controlId='formBasicPassword'>
				<Form.Label>Password</Form.Label>
				<Form.Control
					type='password'
					placeholder='Password'
					onChange={onPasswordHandler}
				/>
			</Form.Group>
			<Button variant='primary' type='submit'>
				Login
			</Button>
		</Form>
	);
}

export default withRouter(Login);
