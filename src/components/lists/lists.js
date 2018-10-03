import React from 'react';
import List from './list/list';

const Lists = (props) => {

	// maps jsonfile data into list component with company name as key, props and index as props
	return (
		<ul>
			{props.data.generated.map((el, index) => <List key={el.company} company={el.company} index={index} clicked={props.clicked} />)}
		</ul>
	);
}

export default Lists;
