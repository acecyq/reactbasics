import React from 'react';
import Data from './data/data';

export default props => {
	let headings, list, data;

	// iterate through the keys of a user to render them as table headings
	if (props.users.length > 0) {
		headings = Object.keys(props.users[0]).map(att => {

			// except for id number, render the rest as table headings
			if (att !== "id") {
				return(
					<th key={att}>
						{att.toUpperCase()}
						<button onClick={() => props.click(att)}>sort</button>
					</th>
				);	
			}
			return null;
		});

		// sort through users based on alphabetical order of the selected attribute
		list = props.users.sort((a, b) => {
			let x, y;

			// if address is selected, sort by address street
			if (props.criteria === "address") {
				x = a["address"]["street"];
				y = b["address"]["street"];

			// if company is selected, sort by company name
			} else if (props.criteria === "company") {
				x = a["company"]["name"];
				y = b["company"]["name"];

			// else sort by criteria selected
			} else {
				x = a[props.criteria];
				y = b[props.criteria];
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
				<tr key={user.name}>
					<Data user={user} />
				</tr>
			);
		})
	}
	
	return (
		<table>
			<thead>
				<tr>
					{headings}
				</tr>
			</thead>
			<tbody>
				{data}
			</tbody>
		</table>
	);
}