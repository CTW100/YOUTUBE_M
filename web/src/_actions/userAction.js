/* 
(2) Action Creator
: Dispatch라는 열차에 Action을 태워서 보내줄 때 
  Dispatch에 inline으로 action을 넣는 것이 불편하기 때문에 action객체를 return 해주는 함수를 만들어놓는 것 (즉, Action을 return 해주는 함수)
*/
import axios from 'axios';
import { LOGIN_USER, REGISTER_USER, AUTH_USER } from './types';

export function loginUser(dataToSubmit) {
	const request = axios
		.post('/api/users/login', dataToSubmit, {
			withCredentials: true,
			crendentials: 'include',
		})
		.then((response) => {
			console.log('data', response.data);
			return response.data;
		});
	// 서버에 데이터를 보낸 후, 서버에서 온 데이터 저장
	// ({loginSuccess: true, userId: user._id})

	// redux의 action -> 이를 dispatch를 통해 reducer로 보냄

	return {
		type: LOGIN_USER,
		payload: request,
	};
}

export function registerUser(dataToSubmit) {
	const request = axios
		.post('/api/users/register', dataToSubmit, { withCredentials: true })
		.then((response) => response.data);

	return {
		type: REGISTER_USER,
		payload: request, // {registerSuccess: true}
	};
}

export function authUser() {
	const request = axios
		.get('/api/users/auth', {
			withCredentials: true,
		})
		.then((response) => {
			return response.data;
		});

	return {
		type: AUTH_USER,
		payload: request,
		// {
		//     _id: req.user._id,
		//     isAuth: true,
		//     email: req.user.email,
		// }
	};
}
