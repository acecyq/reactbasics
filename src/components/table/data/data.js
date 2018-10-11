import React, { Fragment } from 'react';
import TableCell from '@material-ui/core/TableCell';

export default props => {

	// get an array of all the values in the single user object
	const list = Object.values(props.user);

	// map array of values
	const data = list.map((value, index) => {
		// output string is value is a string
		if (index === 1) {
			return (
				<TableCell key={`${list[2]} ${index}`}>
					{value}
				</TableCell>
			);
		} else if (typeof value === "string") {
			return (
				<TableCell key={`${list[2]} ${index}`}>{value}</TableCell>
			);

		// for address, join the street, suite, city and zip code into a string
		} else if (index === 4) {
			const add = Object.values(value).slice(0,4).join(' ');
			return (
				<TableCell key={`${list[2]} ${index}`}>{add}</TableCell>
			);

		// for company, just output company name
		} else if (index === 7) {
			return (
				<TableCell key={`${list[2]} ${index}`}>{value["name"]}</TableCell>
			);
		} else {
			return null;
		}
	});

	return(
		<Fragment>
			{data}
		</Fragment>
	);
}
