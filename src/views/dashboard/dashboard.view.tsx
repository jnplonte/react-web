import * as React from 'react';

import { Grid } from '@material-ui/core';

import { dashboardStyle } from './dashboard.style';
import MoneyIcon from '@material-ui/icons/Money';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import InsertChartIcon from '@material-ui/icons/InsertChartOutlined';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';

import {
  ChartData,
  PieData,
  SummaryData
} from './components';

const Dashboard = () => {
  const classes: any = dashboardStyle();

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={3}>
          <SummaryData title='Summary 1' value='$1,000.00' icon={<MoneyIcon className={classes.icon}/>} />
        </Grid>
        <Grid item xs={12} sm={3}>
          <SummaryData title='Summary 2' value='2,000' icon={<PeopleIcon className={classes.icon}/>} />
        </Grid>
        <Grid item xs={12} sm={3}>
          <SummaryData title='Summary 3' value='80.5%' icon={<InsertChartIcon className={classes.icon}/>} />
        </Grid>
        <Grid item xs={12} sm={3}>
          <SummaryData title='Summary 4' value='$2,000.00' icon={<AttachMoneyIcon className={classes.icon}/>} />
        </Grid>
        <Grid item xs={12} sm={8}>
          <ChartData />
        </Grid>
        <Grid item xs={12} sm={4}>
          <PieData />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
