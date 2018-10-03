import React from 'react';
import { Paper, Grid, withStyles } from '@material-ui/core';
import './data.css';

const styles = {
  paper: {
    textAlign: 'center',
  }
};

const Data = (props) => {
	const { classes } = props;
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
		info = test.map((el, index) => {
			return (
				<Grid item key={index} xs={6}>
          <Paper className={classes.paper}>{el}</Paper>
        </Grid>
			);
		});
	}

	return (
		<Grid container spacing={0}>
			{info}
		</Grid>
	);
}

export default withStyles(styles)(Data);
