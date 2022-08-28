import 'bootstrap/dist/css/bootstrap.min.css';
// npm modules
import React, { Component } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
// custom modules
import reducer from './_reducers';
// custom components
import Navigation from './components/Navigation';
import Main from './pages/Main';
import Login from './pages/Login';
import Register from './pages/Register';
import Logout from './components/Logout';
import VideoUploadPage from './pages/VideoUploadPage';
import VideoDetail from './pages/VideoDetail';
import SubscriptionPage from './pages/SubscriptionPage';
import Auth from './hoc/auth';
import { CookiesProvider } from 'react-cookie';

const createStoreWithMiddleware = applyMiddleware(
	promiseMiddleware,
	ReduxThunk
)(createStore);

class App extends Component {
	render() {
		return (
			<CookiesProvider>
				<Router>
					<Navigation />
					{/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
					<Switch>
						<Route exact path='/' component={Auth(Main, null)} />
						<Route
							exact
							path='/login'
							component={Auth(Login, false)}
						/>
						<Route
							exact
							path='/new'
							component={Auth(Register, false)}
						/>
						<Route
							exact
							path='/logout'
							component={Auth(Logout, true)}
						/>
						<Route
							exact
							path='/video/uploadfile'
							component={Auth(VideoUploadPage, null)}
						/>
						<Route
							exact
							path='/video/:videoId'
							component={Auth(VideoDetail, null)}
						/>
						<Route exact path="/subscription" component={Auth(SubscriptionPage, null)} />
					</Switch>
				</Router>
			</CookiesProvider>
		);
	}
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Provider store={createStoreWithMiddleware(reducer)}>
		<App />
	</Provider>
);
