import { useState } from 'react';

import * as PropTypes from 'prop-types';
import * as md5 from 'md5';

import { Box, Button, Modal } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { userToolbarStyles } from './user-toolbar.style';

import { GetAuth } from '../../../../provider/authentication/authentication.provider';
import { GetSiteInformation } from '../../../../provider/site-information/site-information.provider';
import { UserAPI } from '../../../../api/user.api';

import { UserForm } from '../../components';

const UserToolbar = (props: any) => {
	const { className, refreshData } = props;

	const { t } = useTranslation();

	const { token } = GetAuth();
	const { setNotificationData } = GetSiteInformation();

	const userRequest: UserAPI = new UserAPI(token);

	const [addModal, setAddModal] = useState(false);

	const handleAddOpen = () => {
		setAddModal(true);
	};

	const handleAddClose = () => {
		setAddModal(false);
	};

	const handleAddConfirm = async (data: any = {}) => {
		const apiData: object = {
			username: data['username'],
			email: data['email'],
			password: md5(data['password']),
			roleId: Number(data['roleId']),
			firstName: data['firstName'],
			lastName: data['lastName'],
			phone: data['phone'] || '',
		};

		const requestData: any = await userRequest.post(apiData);
		setNotificationData({ type: requestData.type, message: requestData.message });

		if (requestData.data) {
			refreshData();
			setAddModal(false);
		}
	};

	return (
		<Box sx={[userToolbarStyles.root]} className={className}>
			<Modal open={addModal} onClose={handleAddClose}>
				<div className="modal">
					<UserForm onUpdate={handleAddConfirm} onCancel={handleAddClose} type="insert" data={{}} />
				</div>
			</Modal>
			<Box sx={[userToolbarStyles.row]}>
				<Box sx={userToolbarStyles.spacer} />
				<Button sx={userToolbarStyles.customW100} color="secondary" variant="contained" onClick={handleAddOpen}>
					{t('user.insert')}
				</Button>
			</Box>
		</Box>
	);
};

UserToolbar.propTypes = {
	className: PropTypes.string,
	refreshData: PropTypes.func.isRequired,
};

export default UserToolbar;
