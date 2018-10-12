import React, { Component, Fragment } from 'react';
import Layout from './layout/layout';
import Spinner from './ui/spinner/spinner';
import Heading from './ui/heading/heading';
import Table from './components/table/table';
import Posts from './components/posts/posts';
import Comments from './components/comments/comments';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import axios from 'axios';

// import app css file
import './App.css';

class App extends Component {
	state = {

		// users is an empty array
		users : [],
		criteria : "username",
		error : false
	}

	componentDidMount() {

		// run ajax request to get all users data
		axios.get('/users')
			.then(res => {
				this.setState({ users : res.data });
			})
			.catch(err => {
				console.log(err);
				this.setState({ error : true });
			});
	}

	headingClick = (att) => {
		this.setState({ criteria : att });
	}

	render() {
		// body is a spinner component by default
		let body = <Spinner />

		// if there are users
		if (this.state.users.length > 0) {

			// make a table with the users
			body =
			<Fragment>
				<Heading value="Users" />
				<Table 
					data={this.state.users} 
					criteria={this.state.criteria} 
					click={this.headingClick} 
				/>
			</Fragment>
		} else if (this.state.error) {

			// if there is error show h1 tag with something went wrong
			body = <h1>something went wrong!</h1>
		}

		// set up routes
		return (
			<BrowserRouter>
				<div className="App">
					<Layout />
					<Switch>
						<Route path="/" exact render={() => body} />
						<Route path="/posts/:id/comments" component={Comments} />
						<Route to={{
							pathname : "posts/",
							search : "?user=:id"
						}} component={Posts} />
					</Switch>
					
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
