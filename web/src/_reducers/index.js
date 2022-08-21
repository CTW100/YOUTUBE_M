/* 
(5) combineReducers
: 여러 개의 reducer을 하나의 root reducer로 만들어주는 것
*/

// 여러 개의 Reducer를 rootReducer로 하나로 합쳐줌

import { combineReducers } from 'redux';
import user from './userReducer';

const rootReducer = combineReducers({ user });

export default rootReducer;
