import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { registerUser } from '../_actions/userAction';
import { withRouter } from 'react-router-dom'; // history를 사용하기 위해서

function Register(props) {
	const dispatch = useDispatch();

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [passwordConfirmation, setPasswordConfirmation] = useState('');
	const [email, setEmail] = useState('');

	const onUsernameHandler = (event) => {
		setUsername(event.target.value);
	};

	const onPasswordHandler = (event) => {
		setPassword(event.target.value);
	};

	const onPasswordConfirmationHandler = (event) => {
		setPasswordConfirmation(event.target.value);
	};

	const onEmailHandler = (event) => {
		setEmail(event.target.value);
	};

	const onSubmitHandler = (event) => {
		event.preventDefault();

		if (password !== passwordConfirmation) {
			return alert('비밀번호와 비밀번호 확인은 같아야 합니다.');
		}

		let body = {
			username: username,
			password: password,
			email: email,
		};

		dispatch(registerUser(body)).then((response) => {
			if (response.payload.registerSuccess) {
				props.history.push('/login');
			} else {
				alert('Failed to Sign Up');
				props.history.push('/new');
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
			<Form.Group
				className='mb-3'
				controlId='formBasicPasswordConfirmation'
			>
				<Form.Label>Password Confirmation</Form.Label>
				<Form.Control
					type='password'
					placeholder='Password Confirmation'
					onChange={onPasswordConfirmationHandler}
				/>
			</Form.Group>
			<Form.Group className='mb-3' controlId='formBasicEmail'>
				<Form.Label>Email address</Form.Label>
				<Form.Control
					type='email'
					placeholder='Enter email'
					onChange={onEmailHandler}
				/>
			</Form.Group>
			<Button variant='primary' type='submit'>
				Create
			</Button>
		</Form>
	);
}

export default withRouter(Register);
