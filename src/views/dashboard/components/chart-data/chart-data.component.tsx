import * as PropTypes from 'prop-types';

import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import { Box, Card, CardHeader, CardContent, CardActions, Divider, Button } from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

import { chartStyle } from './chart-data.style';

import { barData, options } from '../../dashboard.constant';

const ChartData = (props: any) => {
	const { className } = props;

	return (
		<Box sx={[chartStyle.root]} className={className}>
			<Card>
				<CardHeader title="Chart Data" />
				<Divider />
				<CardContent>
					<Box sx={chartStyle.chartContainer}>
						<Chart type="bar" data={barData} options={options} />
					</Box>
				</CardContent>
				<Divider />
				<CardActions sx={chartStyle.actions}>
					<Button color="primary" size="small" variant="text">
						View More <ArrowRightIcon />
					</Button>
				</CardActions>
			</Card>
		</Box>
	);
};

ChartData.propTypes = {
	className: PropTypes.string,
};

export default ChartData;
