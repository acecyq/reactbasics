import React, { Fragment } from 'react';
import TableCell from '@material-ui/core/TableCell';

export default props => {
	let data = [
		<TableCell key={`${props.data.username} ${props.index}`}>
			{props.index + 1}
		</TableCell>
	];
	for (let att in props.data) {
		if (att === "address") {
			const add = Object.values(props.data[att]).slice(0,4).join(" ");
			data.push(
				<TableCell key={`${props.data.username} ${att}`}>
					{add}
				</TableCell>
			);
		} else if (att === "company") {
			data.push(
				<TableCell key={`${props.data.username} ${att}`}>
					{props.data[att]["name"]}
				</TableCell>
			);
		} else if (att !== "id" && att !== "userId" && att !== "postId") {
			data.push(
				<TableCell key={`${props.data.username} ${att}`}>
					{props.data[att]}
				</TableCell>
			);
		}
	}

	return(
		<Fragment>
			{data}
		</Fragment>
	);
}
