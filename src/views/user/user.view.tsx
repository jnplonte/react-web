import React, { useState, useEffect, useMemo, useCallback, Suspense } from 'react';

import { withRouter } from 'react-router-dom';
import { Box, Grid, CircularProgress, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { userStyle } from './user.style';

import { UserTable, UserToolbar, SearchInput } from './components';

import { GetAuth } from '../../provider/authentication/authentication.provider';
import { UserAPI } from '../../api/user.api';
import { Helper } from '../../services/helper/helper.service';

import { IQueryProps } from '../../interfaces/core.interface';

const helper: Helper = new Helper();

const User = (props: any) => {
	const { t } = useTranslation();

	const { token } = GetAuth();
	const userRequest: UserAPI = useMemo(() => new UserAPI(token), [token]);

	const [loading, setLoading] = useState<boolean>(false);
	const [apiParams, setApiParams] = useState<IQueryProps>({ limit: 10, page: 1, order: 'createdAt:DESC', query: null });

	const [users, setUsers] = useState<Array<any | null>>([]);
	const [paginations, setPaginations] = useState<object>({});

	const fetchDataAsync = useCallback(
		async (initLoad: boolean = false) => {
			if (initLoad) {
				setLoading(true);
			}
			const requestData: any = await userRequest.getAll(apiParams);

			setLoading(false);
			if (requestData.data) {
				setUsers(requestData.data || []);
				setPaginations(requestData.pagination || {});
			} else {
				setUsers([]);
				setPaginations({});
			}
		},
		[userRequest, apiParams]
	);

	useEffect(() => {
		fetchDataAsync(true);

		return () => {
			setUsers([]);
			setPaginations({});
			setApiParams({ limit: 10, page: 1, order: 'createdAt:DESC', query: null });
		};
	}, []);

	const handleRefresh = (type: string, param: any) => {
		if (helper.isNotEmpty(type)) {
			apiParams[type] = param;
			setApiParams(apiParams);
		}

		fetchDataAsync();
	};

	return (
		<Box sx={[userStyle.root]}>
			<Suspense fallback={<CircularProgress sx={userStyle.loading} size={60} />}>
				{loading ? (
					<CircularProgress sx={userStyle.loading} size={60} />
				) : (
					<Box>
						<Grid container spacing={1}>
							<Grid item xs={12} sm={4}>
								<SearchInput refreshData={handleRefresh} placeholder={t('form.search')} />
							</Grid>
							<Grid item xs={12} sm={8}>
								<UserToolbar refreshData={handleRefresh} />
							</Grid>
						</Grid>
						<Box sx={[userStyle.content]}>
							{users.length >= 1 ? (
								<UserTable
									data={users}
									pagination={paginations}
									limit={apiParams['limit']}
									refreshData={handleRefresh}
								/>
							) : (
								<Typography sx={userStyle.noUser} variant="h4">
									{t('general.noData')}
								</Typography>
							)}
						</Box>
					</Box>
				)}
			</Suspense>
		</Box>
	);
};

export default withRouter(User);
