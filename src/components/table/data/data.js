import React, { Fragment } from 'react';

export default props => {

	// get an array of all the values in the single user object
	const list = Object.values(props.user);

	// map array of values
	const data = list.map((value, index) => {

		// output string is value is a string
		if (typeof value === "string") {
			return (
				<td key={index}>{value}</td>
			);

		// for address, join the street, suite, city and zip code into a string
		} else if (index === 4) {
			const add = Object.values(value).slice(0,4).join(' ');
			return (
				<td key={index}>{add}</td>
			);

		// for company, just output company name
		} else if (index === 7) {
			return (
				<td key={index}>{value["name"]}</td>
			);
		}
	});

	return(
		<Fragment>
			{data}
		</Fragment>
	);
}
