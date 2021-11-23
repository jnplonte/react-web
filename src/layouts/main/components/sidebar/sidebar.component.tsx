import * as PropTypes from 'prop-types';

import { Box, Divider, Drawer } from '@mui/material';
import { useTranslation } from 'react-i18next';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';

import { Profile, SidebarNav } from './components';
import { sidebarStyle } from './sidebar.style';

const Sidebar = (props: any) => {
	const { open, variant, onClose, className } = props;

	const { t } = useTranslation();

	const pages = [
		{
			name: 'dashboard',
			title: t('menu.dashboard'),
			href: '/dashboard',
			icon: <DashboardIcon />,
		},
		{
			name: 'user',
			title: t('menu.user'),
			href: '/user',
			icon: <PeopleIcon />,
		},
	];

	return (
		<Drawer sx={sidebarStyle.drawer} anchor="left" onClose={onClose} open={open} variant={variant}>
			<Box sx={[sidebarStyle.root]} className={className}>
				<Profile />
				<Divider sx={sidebarStyle.divider} />
				<SidebarNav sx={sidebarStyle.nav} pages={pages} />
			</Box>
		</Drawer>
	);
};

Sidebar.propTypes = {
	className: PropTypes.string,
	onClose: PropTypes.func,
	open: PropTypes.bool.isRequired,
	variant: PropTypes.string.isRequired,
};

export default Sidebar;
