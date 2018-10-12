import React, { Component } from 'react';
import Data from './data/data';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';

// modify hover attribute of styles
const styles = {
	hover: {
		cursor : "pointer"
	}
}

class TableComponent extends Component {
	userClick = (id) => {
		if (this.props.location.pathname === '/'){
			this.props.history.push(`/posts/?user=${id}`);
		} else if (this.props.location.pathname === '/posts/') {
			this.props.history.push(`/posts/${id}/comments`);
		}
		
	}

	render() {
		let headings, list, data;
		const { classes } = this.props;

		// iterate through the keys of a data to render them as table headings
		if (this.props.data.length > 0) {
			headings = Object.keys(this.props.data[0]).map(att => {

				// except for ids, render the rest as table headings
				if (att !== "id" && att !== "userId" && att !== "postId") {
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
			list = this.props.data.sort((a, b) => {
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
			data = list.map(el => {
				return (
					<TableRow
						key={el.id} 
						classes={{
							hover : classes.hover
						}}
						hover
						onClick={() => this.userClick(el.id)}
					>
						<Data data={el} />
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

TableComponent.propTypes = {
	classes: PropTypes.object.isRequired,
};

// wrap withStyles with withRouter
export default withRouter(withStyles(styles)(TableComponent));