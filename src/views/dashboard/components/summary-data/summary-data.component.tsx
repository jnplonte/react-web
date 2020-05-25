import * as React from 'react';
import * as PropTypes from 'prop-types';

import clsx from 'clsx';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';

import { summaryStyle } from './summary-data.style';

const SummaryData = (props: any) => {
  const { className, title, value, icon } = props;

  const classes: any = summaryStyle();

  return (
    <Card className={clsx(classes.root, className)}>
    <CardContent>
      <Grid container justify='space-between'>
        <Grid item>
          <Typography
            className={classes.title}
            color='textSecondary'
            gutterBottom
            variant='body2'>
            {title}
          </Typography>
          <Typography variant='h3'>{value}</Typography>
        </Grid>
        <Grid item>
          <Avatar className={classes.avatar}>
            {icon}
          </Avatar>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
  );
};

SummaryData.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
};

export default SummaryData;
