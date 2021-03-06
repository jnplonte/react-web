import React from 'react';
import * as md5 from 'md5';

import { ChangeEvent, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Tabs, Tab } from '@material-ui/core';

import { accountStyle } from './account.style';

import { GetAuth } from '../../provider/authentication/authentication.provider';
import { GetSiteInformation } from '../../provider/site-information/site-information.provider';
import { UserAPI } from '../../api/user.api';

import { TabPannelComponent } from '../../components';
import { Profile, Password } from './components';

const Account = (props: any) => {
	const classes: any = accountStyle();

	const { token, authData, setAuthData } = GetAuth();
	const { setNotificationData } = GetSiteInformation();

	const userRequest: UserAPI = new UserAPI(token);

	const [value, setValue] = useState(0);

	const handleChange = (event: ChangeEvent, newValue: number) => {
		event.persist();

		setValue(newValue);
	};

	const handleProfileUpdate = async (uData: object = {}) => {
		const apiData: object = {
			email: uData['email'],
			firstName: uData['firstName'],
			lastName: uData['lastName'],
			phone: uData['phone'] || '',
		};

		const requestData: any = await userRequest.put({ id: authData['id'] }, apiData);
		setNotificationData({ type: requestData.type, message: requestData.message });

		if (requestData.data) {
			setAuthData();
		}
	};

	const handlePasswordUpdate = async (uData: object = {}) => {
		const apiData: object = {
			password: md5(uData['password']),
		};

		const requestData: any = await userRequest.put({ id: authData['id'] }, apiData);
		setNotificationData({ type: requestData.type, message: requestData.message });
	};

	return (
		<div className={classes.root}>
			<Tabs value={value} onChange={handleChange} variant='fullWidth'>
				<Tab label='Profile' id='tab-0' />
				<Tab label='Password' id='tab-1' />
			</Tabs>
			<TabPannelComponent value={value} index={0}>
				<Profile onUpdate={handleProfileUpdate} data={authData} />
			</TabPannelComponent>
			<TabPannelComponent value={value} index={1}>
				<Password onUpdate={handlePasswordUpdate} />
			</TabPannelComponent>
		</div>
	);
};

export default withRouter(Account);
