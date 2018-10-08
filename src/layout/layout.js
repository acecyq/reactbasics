import React, { Fragment } from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core/';

export default props =>  {
  return (
    <Fragment>
      <AppBar position="static" color="inherit">
        <Toolbar>
          <Typography variant="title" color="inherit">
            React Basics
          </Typography>
        </Toolbar>
      </AppBar>
    </Fragment>
  );
}