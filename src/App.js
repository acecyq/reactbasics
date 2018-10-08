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
		criteria : "username"
	}

	componentDidMount() {

		// run ajax request to get all users data
		axios.get('https://jsonplaceholder.typicode.com/users')
			.then(res => {
				this.setState({ users : res.data });
			});
	}

	headingClick = (att) => {
		this.setState({ criteria : att });
	}

	render() {
		return (
			<div className="App">
				<Layout />
				<Table users={this.state.users} criteria={this.state.criteria} click={this.headingClick} />
			</div>
		);
	}
}

export default App;
