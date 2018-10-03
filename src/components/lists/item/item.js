import React from 'react';
import { ListItem, ListItemText, Avatar, withStyles } from '@material-ui/core';
import green from '@material-ui/core/colors/green';
import AssignmentIcon from '@material-ui/icons/Assignment';

const styles = {
  greenAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: green[500],
  }
};

const Item = (props) => {
	const { classes } = props;

	// store props.index as id and props.company as value
	return (
		<ListItem onClick={(event) => props.clicked(event, props.index)}>
	    <Avatar className={classes.greenAvatar} >
	      <AssignmentIcon />
	    </Avatar>
	    <ListItemText primary={props.company} />
	  </ListItem>
  );
}

export default withStyles(styles)(Item);
