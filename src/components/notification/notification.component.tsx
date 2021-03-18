import React, { useEffect, useState } from 'react';

import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

import { GetSiteInformation } from '../../provider/site-information/site-information.provider';

const NotificationComponent = () => {
	const { notificationData, setNotificationData } = GetSiteInformation();

	const [isOpen, setIsOpen] = useState<boolean>(false);

	useEffect(() => {
		if (Object.keys(notificationData).length >= 1 && notificationData.constructor === Object) {
			setIsOpen(true);
		}
	}, [notificationData]);

	const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
		if (reason === 'clickaway') {
			return;
		}
		setIsOpen(false);
		setTimeout(() => {
			setNotificationData({});
		}, 1000);
	};

	return (
		<Snackbar
			open={isOpen}
			autoHideDuration={3000}
			onClose={handleClose}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
		>
			<Alert
				className="app-notiification"
				elevation={6}
				variant="filled"
				onClose={handleClose}
				severity={notificationData['type'] || 'success'}
			>
				<span>{notificationData['message'] || ''}</span>
			</Alert>
		</Snackbar>
	);
};

export default NotificationComponent;
