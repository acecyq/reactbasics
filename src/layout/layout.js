import React, { Fragment } from 'react';

import { AppBar, Toolbar, Typography } from '@material-ui/core/';

export default props => (
  <Fragment>
    <AppBar position="static" color="inherit">
      <Toolbar>
        <Typography variant="title" color="inherit">
          Blog Posts and Comments Back End
        </Typography>
      </Toolbar>
    </AppBar>
  </Fragment>
);