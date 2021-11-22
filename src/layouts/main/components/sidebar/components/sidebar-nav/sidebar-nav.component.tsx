import * as PropTypes from 'prop-types';

import clsx from 'clsx';
import { Link, withRouter } from 'react-router-dom';
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';

import { sidebarStyle } from './sidebar-nav.style';

const SidebarNav = (props: any) => {
	const { pages, location, className } = props;

	const path: string = location.pathname.split('/')[1];

	return (
		<List sx={[sidebarStyle.root]} className={className}>
			{pages.map((page: any) => (
				<ListItem
					sx={sidebarStyle.item}
					button
					className={clsx({ 'active-sidebar-nav': path === page.name })}
					disableGutters
					key={page.title}
					component={Link}
					to={page.href}
				>
					<ListItemIcon>{page.icon}</ListItemIcon>
					<ListItemText primary={page.title} />
				</ListItem>
			))}
		</List>
	);
};

SidebarNav.propTypes = {
	className: PropTypes.string,
	pages: PropTypes.array.isRequired,
};

export default withRouter(SidebarNav);
