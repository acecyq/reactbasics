import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = {
    root : {
        flexGrow : 1,
    },
};  

const Heading = (props) => {
    const { classes } = props;

    return (
        <div className={classes.root}>
            <AppBar position="static" color="inherit">
                <Toolbar>
                    <Typography align="center" color="default" variant="display1" >
                        {props.value}
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
   );
}

Heading.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Heading);