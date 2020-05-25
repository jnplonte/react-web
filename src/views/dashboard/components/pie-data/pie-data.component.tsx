import * as React from 'react';
import * as PropTypes from 'prop-types';

import clsx from 'clsx';
import { Pie } from 'react-chartjs-2';
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  CardActions,
  Button
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import { pieStyle } from './pie-data.style';

import { pieData, options } from '../../dashboard.constant';

const PieData = (props: any) => {
  const { className } = props;

  const classes: any = pieStyle();

  return (
    <Card className={clsx(classes.root, className)}>
      <CardHeader title='Pie Data' />
      <Divider />
      <CardContent>
        <div className={classes.chartContainer}>
          <Pie data={pieData} options={options} />
        </div>
      </CardContent>
      <Divider />
      <CardActions className={classes.actions}>
        <Button color='primary' size='small' variant='text'>
          View More <ArrowRightIcon />
        </Button>
      </CardActions>
    </Card>
  );
};

PieData.propTypes = {
  className: PropTypes.string,
};

export default PieData;
