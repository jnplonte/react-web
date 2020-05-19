import * as React from 'react';
import { withRouter } from 'react-router-dom';

import { accountStyle } from './account.style';

const Account = (props: any) => {
  const classes: any = accountStyle();

  return (
    <div className={classes.root}>
      ACCOUNT
    </div>
  );
};

export default withRouter(Account);
