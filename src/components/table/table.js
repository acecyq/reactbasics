import React, { Component } from 'react';
import Data from './data/data';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Button } from '@material-ui/core';
import { withRouter } from 'react-router-dom';

class TableComponent extends Component {
	userClick = (id) => {
		this.props.history.push(`/posts/?user=${id}`);
	}

	render() {
		let headings, list, data;

		// iterate through the keys of a user to render them as table headings
		if (this.props.users.length > 0) {
			headings = Object.keys(this.props.users[0]).map(att => {

				// except for id number, render the rest as table headings
				if (att !== "id") {
					return(
						<TableCell key={att}>
							{att.toUpperCase()}
							<br />
							<Button onClick={() => this.props.click(att)}>
								sort
							</Button>
						</TableCell>
					);	
				}
				return null;
			});

			// sort through users based on alphabetical order of the selected attribute
			list = this.props.users.sort((a, b) => {
				let x, y;

				// if address is selected, sort by address street
				if (this.props.criteria === "address") {
					x = a["address"]["street"];
					y = b["address"]["street"];

				// if company is selected, sort by company name
				} else if (this.props.criteria === "company") {
					x = a["company"]["name"];
					y = b["company"]["name"];

				// else sort by criteria selected
				} else {
					x = a[this.props.criteria];
					y = b[this.props.criteria];
				}

				if (x <= y) {
					return -1;
				} else {
					return 1;
				}
			})

			// create one row for every user
			data = list.map(user => {
				return (
					<TableRow key={user.id} hover onClick={() => this.userClick(user.id)}>
						<Data user={user} />
					</TableRow>
				);
			})
		}
		
		return (
			<Paper>
				<Table>
					<TableHead>
						<TableRow>
							{headings}
						</TableRow>
					</TableHead>
					<TableBody>
						{data}
					</TableBody>
				</Table>
			</Paper>
		);
	}
}

export default withRouter(TableComponent);