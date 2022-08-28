import { withRouter } from 'react-router-dom'; // history를 사용하기 위해서
import axios from 'axios';

const Logout = (props) => {
	const onLogoutHandler = (event) => {
		event.preventDefault();

		axios
			.get('https://youtube-api.run.goorm.io/api/users/logout')
			.then((response) => {
				console.log(response.data);
				if (response.data.logoutSuccess) {
					console.log('Logout Success');
					props.history.push('/');
				} else {
					alert('Logout Failed!');
				}
			});
	};

	return (
		<div>
			<button onClick={onLogoutHandler}>Logout</button>
		</div>
	);
};

export default withRouter(Logout);
