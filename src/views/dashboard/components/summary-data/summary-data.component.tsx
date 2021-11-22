import * as PropTypes from 'prop-types';

import { Box, Card, CardContent, Grid, Typography, Avatar } from '@mui/material';

import { summaryStyle } from './summary-data.style';

const SummaryData = (props: any) => {
	const { className, title, value, icon } = props;

	return (
		<Box sx={[summaryStyle.root]} className={className}>
			<Card>
				<CardContent>
					<Grid container justifyContent="space-between">
						<Grid item>
							<Typography align="left" color="textSecondary" gutterBottom variant="body2">
								{title}
							</Typography>
							<Typography variant="h3">{value}</Typography>
						</Grid>
						<Grid item>
							<Avatar sx={[summaryStyle.avatar]}>{icon}</Avatar>
						</Grid>
					</Grid>
				</CardContent>
			</Card>
		</Box>
	);
};

SummaryData.propTypes = {
	className: PropTypes.string,
	title: PropTypes.string.isRequired,
	value: PropTypes.string.isRequired,
	icon: PropTypes.element.isRequired,
};

export default SummaryData;
