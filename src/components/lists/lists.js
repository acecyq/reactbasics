import React from 'react';
import List from '@material-ui/core/List';
import Item from './item/item';

const Items = (props) => {

	// maps jsonfile data into list component with company name as key, props and index as props
	return (
		<List>
			{props.data.generated.map((el, index) => <Item key={el.company} company={el.company} index={index} clicked={props.clicked} />)}
		</List>
	);
}

export default Items;
