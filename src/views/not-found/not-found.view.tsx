import React from 'react';
import { withRouter } from 'react-router-dom';

import { Grid, Typography } from '@material-ui/core';

import { notFoundStyle } from './not-found.style';

const NotFound = (props: any) => {
	const { history } = props;

	const classes: any = notFoundStyle();

	const handleGoBackToHome = () => {
		history.push('/');
	};

	return (
		<div className={classes.root}>
			<Grid container justify='center' spacing={4}>
				<Grid item lg={6} xs={12}>
					<div className={classes.content}>
						<Typography variant='h3'>PAGE NOT FOUND</Typography>
						<Typography variant='subtitle2' onClick={handleGoBackToHome} className={classes.goback}>
							go back to home page
						</Typography>
					</div>
				</Grid>
			</Grid>
		</div>
	);
};

export default withRouter(NotFound);
