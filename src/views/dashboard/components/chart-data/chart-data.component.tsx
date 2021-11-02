import * as PropTypes from 'prop-types';

import clsx from 'clsx';
import { Bar } from 'react-chartjs-2';
import { Card, CardHeader, CardContent, CardActions, Divider, Button } from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import { chartStyle } from './chart-data.style';

import { barData, options } from '../../dashboard.constant';

const ChartData = (props: any) => {
	const { className } = props;

	const classes: any = chartStyle();

	return (
		<Card className={clsx(classes.root, className)}>
			<CardHeader title="Chart Data" />
			<Divider />
			<CardContent>
				<div className={classes.chartContainer}>
					<Bar data={barData} options={options} />
				</div>
			</CardContent>
			<Divider />
			<CardActions className={classes.actions}>
				<Button color="primary" size="small" variant="text">
					View More <ArrowRightIcon />
				</Button>
			</CardActions>
		</Card>
	);
};

ChartData.propTypes = {
	className: PropTypes.string,
};

export default ChartData;
