import React from 'react';

import { withRouter } from 'react-router-dom';

import { Grid, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { notFoundStyle } from './not-found.style';

const NotFound = (props: any) => {
	const { history } = props;

	const classes: any = notFoundStyle();
	const { t } = useTranslation();

	const handleGoBackToHome = () => {
		history.push('/');
	};

	return (
		<div className={classes.root}>
			<Grid container justify="center" spacing={4}>
				<Grid item lg={6} xs={12}>
					<div className={classes.content}>
						<Typography variant="h1">{t('notfound.pageNotFound')}</Typography>
						<Typography variant="subtitle1" onClick={handleGoBackToHome} className={classes.goback}>
							{t('notfound.goBackToHome')}
						</Typography>
					</div>
				</Grid>
			</Grid>
		</div>
	);
};

export default withRouter(NotFound);
