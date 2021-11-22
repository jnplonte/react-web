import { Suspense } from 'react';
import { Box, Grid, CircularProgress } from '@mui/material';

import { dashboardStyle } from './dashboard.style';
import MoneyIcon from '@mui/icons-material/Money';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import InsertChartIcon from '@mui/icons-material/InsertChartOutlined';
import PeopleIcon from '@mui/icons-material/PeopleOutlined';

import { ChartData, PieData, SummaryData } from './components';

const Dashboard = () => (
	<Box sx={[dashboardStyle.root]}>
		<Suspense fallback={<CircularProgress size={60} />}>
			<Grid container spacing={4}>
				<Grid item xs={12} sm={3}>
					<SummaryData title="Summary 1" value="$1,000.00" icon={<MoneyIcon sx={[dashboardStyle.icon]} />} />
				</Grid>
				<Grid item xs={12} sm={3}>
					<SummaryData title="Summary 2" value="2,000" icon={<PeopleIcon sx={[dashboardStyle.icon]} />} />
				</Grid>
				<Grid item xs={12} sm={3}>
					<SummaryData title="Summary 3" value="80.5%" icon={<InsertChartIcon sx={[dashboardStyle.icon]} />} />
				</Grid>
				<Grid item xs={12} sm={3}>
					<SummaryData title="Summary 4" value="$2,000.00" icon={<AttachMoneyIcon sx={[dashboardStyle.icon]} />} />
				</Grid>
				<Grid item xs={12} sm={8}>
					<ChartData />
				</Grid>
				<Grid item xs={12} sm={4}>
					<PieData />
				</Grid>
			</Grid>
		</Suspense>
	</Box>
);

export default Dashboard;
