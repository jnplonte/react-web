import React from 'react';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import { Grid, Typography, CircularProgress } from '@material-ui/core';

import { userStyle } from './user.style';

import { UserTable, UserToolbar, SearchInput } from './components';

import { GetAuth } from '../../provider/authentication/authentication.provider';
import { UserAPI } from '../../api/user.api';
import { Helper } from '../../services/helper/helper.service';

const helper: Helper = new Helper();

const User = (props: any) => {
	const classes: any = userStyle();

	const { token } = GetAuth();
	const userRequest: UserAPI = useMemo(() => new UserAPI(token), [token]);

	const [loading, setLoading] = useState<boolean>(false);
	const [apiParams, setApiParams] = useState<object>({ limit: 10, page: 1, order: 'createdAt:DESC', query: null });

	const [users, setUsers] = useState<Array<any | null>>([]);
	const [paginations, setPaginations] = useState<object>({});

	const fetchDataAsync = useCallback(async () => {
		setLoading(true);
		const requestData: any = await userRequest.getAll(apiParams);

		setLoading(false);
		if (requestData.data) {
			setUsers(requestData.data || []);
			setPaginations(requestData.pagination || {});
		} else {
			setUsers([]);
			setPaginations({});
		}
	}, [userRequest, apiParams]);

	useEffect(() => {
		fetchDataAsync();

		return () => {
			setUsers([]);
			setPaginations({});
			setApiParams({ limit: 10, page: 1, order: 'createdAt:DESC', query: null });
		};
	}, [fetchDataAsync]);

	const handleRefresh = (type: string, param: any) => {
		if (helper.isNotEmpty(type)) {
			apiParams[type] = param;
			setApiParams(apiParams);
		}

		fetchDataAsync();
	};

	return (
		<div className={classes.root}>
			{loading ? (
				<CircularProgress className={classes.loading} size={60} />
			) : (
				<div>
					<Grid container spacing={1}>
						<Grid item xs={8} sm={4}>
							<SearchInput refreshData={handleRefresh} placeholder='Search User Name' />
						</Grid>
						<Grid item xs={4} sm={8}>
							<UserToolbar refreshData={handleRefresh} />
						</Grid>
					</Grid>
					<div className={classes.content}>
						{users.length >= 1 ? (
							<UserTable data={users} pagination={paginations} limit={apiParams['limit']} refreshData={handleRefresh} />
						) : (
							<Typography className={classes.noUser} variant='h4'>
								No User Data
							</Typography>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default withRouter(User);
