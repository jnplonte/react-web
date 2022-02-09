import * as PropTypes from 'prop-types';

import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import { Box, Card, CardHeader, CardContent, Divider, CardActions, Button } from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

import { pieStyle } from './pie-data.style';

import { pieData, options } from '../../dashboard.constant';

const PieData = (props: any) => {
	const { className } = props;

	return (
		<Box sx={[pieStyle.root]} className={className}>
			<Card>
				<CardHeader title="Pie Data" />
				<Divider />
				<CardContent>
					<Box sx={pieStyle.chartContainer}>
						<Chart type="pie" data={pieData} options={options} />
					</Box>
				</CardContent>
				<Divider />
				<CardActions sx={pieStyle.actions}>
					<Button color="primary" size="small" variant="text">
						View More <ArrowRightIcon />
					</Button>
				</CardActions>
			</Card>
		</Box>
	);
};

PieData.propTypes = {
	className: PropTypes.string,
};

export default PieData;
