import { useEffect, useState, SyntheticEvent } from 'react';

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import { GetSiteInformation } from '../../provider/site-information/site-information.provider';
import { Typography } from '@mui/material';

const NotificationComponent = () => {
	const { notificationData, setNotificationData } = GetSiteInformation();

	const [isOpen, setIsOpen] = useState<boolean>(false);

	useEffect(() => {
		if (Object.keys(notificationData).length >= 1 && notificationData.constructor === Object) {
			setIsOpen(true);
		}
	}, [notificationData]);

	const handleClose = () => {
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
				<Typography sx={{ color: '#F4F6F8' }}>{notificationData['message'] || ''}</Typography>
			</Alert>
		</Snackbar>
	);
};

export default NotificationComponent;
