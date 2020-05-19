import * as React from 'react';
import { withRouter } from 'react-router-dom';

import { userStyle } from './user.style';

const User = (props: any) => {
  const classes: any = userStyle();

  return (
    <div className={classes.root}>
      USER
    </div>
  );
};

export default withRouter(User);
