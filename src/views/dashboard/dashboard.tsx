import * as React from 'react';
import { makeStyles } from '@material-ui/styles';

import {
  TestComponent
} from './components';

const useStyles = makeStyles((theme: any) => ({
  root: {
    padding: theme.spacing(4),
  },
}));

const Dashboard = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      DASHBOARD

      <TestComponent />
    </div>
  );
};

export default Dashboard;
