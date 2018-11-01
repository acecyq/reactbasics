import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import actionTypes from './store/Action';
import Layout from './layout/layout';
import Posts from './components/posts/posts';
import Comments from './components/comments/comments';
import Users from './components/users/users';
import './App.css';

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<div className="App">
					<Layout />
					<Switch>
						<Route path="/users" component={Users} />
						<Route path="/comments/:id/posts" component={Comments} />
						<Route to={{
							pathname : "posts/",
							search : "?user=:id"
						}} component={Posts} />
						{/* <Route path="/posts/?user=:id" component={Posts}/> */}
						<Route render={() => (<Redirect to='/users'/>)} />
					</Switch>
					
				</div>
			</BrowserRouter>
		);
	}
}

const mapStateToProps = state => {
	return {
		table: state.table,
		criteria: state.critera,
		error: state.error
	};
}

const mapDispatchToProps = dispatch => {
	return {
		getUser: (data) => dispatch({type: actionTypes.getUser, data: data }),
		raiseError: (err) => dispatch({type: actionTypes.raiseError, error: err}),
		sortClick: (att) => dispatch({type: actionTypes.sortClick, att: att})
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
