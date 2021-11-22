import * as PropTypes from 'prop-types';

import { Box, Avatar, Typography } from '@mui/material';

import { GetAuth } from '../../../../../../provider/authentication/authentication.provider';

import { profileStyle } from './profile.style';

const Profile = (props: any) => {
	const { className } = props;

	const { authData } = GetAuth();

	const user = {
		name: authData ? `${authData['firstName'] || ''} ${authData['lastName'] || ''}` : '',
		avatar: process.env.REACT_APP_LOGO,
		email: authData ? authData['email'] : '',
	};

	return (
		<Box sx={[profileStyle.root]} className={className}>
			<Box sx={[profileStyle.avatarContainer]}>
				<Avatar alt={user.name} title={user.name} sx={profileStyle.avatar} src={user.avatar} />
			</Box>
			<Typography align="center" sx={profileStyle.name} variant="h5">
				{user.name}
			</Typography>
			<Typography align="center" variant="body2">
				{user.email}
			</Typography>
		</Box>
	);
};

Profile.propTypes = {
	className: PropTypes.string,
};

export default Profile;
