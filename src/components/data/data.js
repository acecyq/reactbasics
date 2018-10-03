import React from 'react';
import './data.css';

const Data = (props) => {
	let info = null;
	let test = [];

	// if props.info is not an empty object
	if (Object.keys(props.info).length > 0) {

		// for every key in props.info object
		for (let key in props.info) {

			// if key is tags
			if (key === "tags") {
				test.push(key);
				test.push("");
				for (let element of props.info[key]) {
					test.push("");
					test.push(element);
				}

			// if key is friends
			} else if (key === "friends") {
				test.push(key);
				test.push("");
				for (let element of props.info[key]) {
					test.push(element.id);
					test.push(element.name);
				}
			} else {
				test.push(key);
				test.push(props.info[key]);
			}
		}

		// map test results into divs
		info = test.map((el, index) => <div key={index}>{el}</div>);
	}

	return (
		<div className="grid-container">
			{info}
		</div>
	);
}

export default Data;
