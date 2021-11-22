import { withRouter } from 'react-router-dom';

import { Box, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { notFoundStyle } from './not-found.style';

const NotFound = (props: any) => {
	const { history } = props;

	const { t } = useTranslation();

	const handleGoBackToHome = () => {
		history.push('/');
	};

	return (
		<Box sx={[notFoundStyle.root]}>
			<Grid container justifyContent="center" spacing={4}>
				<Grid item lg={6} xs={12}>
					<Typography variant="h2">{t('notfound.pageNotFound')}</Typography>
					<Typography data-testid="goback" variant="subtitle1" onClick={handleGoBackToHome} sx={notFoundStyle.goback}>
						{t('notfound.goBackToHome')}
					</Typography>
				</Grid>
			</Grid>
		</Box>
	);
};

export default withRouter(NotFound);
