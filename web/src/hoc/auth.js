/* hoc에 컴포넌트를 넣어주어 새로운 컴포넌트를 만들어서 인증 체크를 해줌
   const EnhancedComponent = higherOrderComponent(WrappedComponent);
 -HOC------------
 |   component  |
  ---------------
-> 감싸주는 것은 App.js에서 
*/

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { authUser } from '../_actions/userAction';

export default function (SpecificComponent, option) {
	// option- null, true, false
	// null => 아무나 출입이 가능한 페이지
	// true => 로그인한 유저만 출입이 가능한 페이지
	// false => 로그인한 유저는 출입 불가능한 페이지

	function AuthenticationCheck(props) {
		// 백엔드에 Request를 날려서 현재 상태를 가져옴 (로그인 했는지, 아닌지)
		const dispatch = useDispatch();

		useEffect(() => {
			// Redux 사용 시

			// 아무나 진입 가능한 페이지
			// 로그인한 회원만 진입 가능한 페이지
			// 로그인한 회원은 진입 못하는 페이지

			dispatch(authUser()).then((response) => {
				console.log(response);
				console.log(response.payload.isAuth);

				// 로그인 하지 않은 상태
				if (!response.payload.isAuth) {
					// 로그인 하지 않은 상태에서 로그인한 유저만 출입 가능한 페이지로 들어가려고 할 때
					if (option) {
						props.history.push('/login');
					}
				} else {
					// 로그인한 유저가 출입 불가능한 페이지에 들어가려고 할 때
					if (option === false) props.history.push('/');
				}
			});
		}, []);
		return <SpecificComponent />;
	}

	return AuthenticationCheck;
}
