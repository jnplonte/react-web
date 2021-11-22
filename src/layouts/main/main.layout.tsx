import { MouseEvent, useState } from 'react';

import * as PropTypes from 'prop-types';

import { Box } from '@mui/material';

import { useTheme } from '@mui/styles';
import { useMediaQuery, Zoom, Fab, useScrollTrigger } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { mainStyle } from './main.style';
import { Sidebar, Topbar, Footer } from './components';

import { NotificationComponent } from '../../components';

import { GetAuth } from '../../provider/authentication/authentication.provider';

function ScrollTop(props: any) {
	const { children, window } = props;

	const trigger = useScrollTrigger({
		target: window ? window() : undefined,
		disableHysteresis: true,
		threshold: 100,
	});

	const handleClick = (event: MouseEvent | null) => {
		const anchor = ((event?.target as HTMLElement).ownerDocument || document).querySelector('#back-to-top');

		if (anchor) {
			anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
		}
	};

	return (
		<Zoom in={trigger}>
			<div onClick={handleClick} role="presentation" className="backToTop">
				{children}
			</div>
		</Zoom>
	);
}

const Main = (props: any) => {
	const { children } = props;

	const theme: any = useTheme();

	const { setToken } = GetAuth();

	const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
		defaultMatches: true,
	});

	const [openSidebar, setOpenSidebar] = useState(false);

	const handleSidebarOpen = () => {
		setOpenSidebar(true);
	};

	const handleSidebarClose = () => {
		setOpenSidebar(false);
	};

	const handleSignOut = (event: MouseEvent | null) => {
		event?.preventDefault();

		setToken('');
		window.location.reload();
	};

	const shouldOpenSidebar = isDesktop ? true : openSidebar;

	return (
		<Box sx={[mainStyle.root]}>
			<NotificationComponent />
			<div id="back-to-top">
				<Topbar onSidebarOpen={handleSidebarOpen} onSignOut={handleSignOut} />
			</div>
			<Sidebar onClose={handleSidebarClose} open={shouldOpenSidebar} variant={isDesktop ? 'persistent' : 'temporary'} />
			<main sx={mainStyle.content} className="main-container">
				{children}
			</main>
			<ScrollTop {...props}>
				<Fab color="secondary" size="small" aria-label="scroll to top">
					<KeyboardArrowUpIcon />
				</Fab>
			</ScrollTop>
			<Footer />
		</Box>
	);
};

Main.propTypes = {
	children: PropTypes.node,
};

export default Main;
