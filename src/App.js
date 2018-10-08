import React, { Component } from 'react';
import Layout from './layout/layout';
import Table from './components/table/table';

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
		return (
			<div className="App">
				<Layout />
				{!this.state.error ?
					<Table users={this.state.users} criteria={this.state.criteria} click={this.headingClick} />
				:
					<h1>something went wrong!</h1>
				}
			</div>
		);
	}
}

export default App;
