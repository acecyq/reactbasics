import React from 'react';

const List = (props) => {

	// store props.index as id and props.company as value
	return <li id={props.index} onClick={props.clicked}>{props.company}</li>
}

export default List;
