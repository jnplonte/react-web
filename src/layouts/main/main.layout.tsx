import React from 'react';
import * as PropTypes from 'prop-types';

import clsx from 'clsx';

import { MouseEvent, useState } from 'react';
import { useTheme } from '@material-ui/styles';
import { useMediaQuery, Zoom, Fab, useScrollTrigger } from '@material-ui/core';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

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

	const handleClick = (event: MouseEvent) => {
		const anchor = ((event.target as HTMLElement).ownerDocument || document).querySelector('#back-to-top');

		if (anchor) {
			anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
		}
	};

	return (
		<Zoom in={trigger}>
			<div onClick={handleClick} role='presentation' className='backToTop'>
				{children}
			</div>
		</Zoom>
	);
}

const Main = (props: any) => {
	const { children } = props;

	const classes: any = mainStyle();
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

	const handleSignOut = (event: MouseEvent) => {
		event.preventDefault();

		setToken('');
		window.location.reload();
	};

	const shouldOpenSidebar = isDesktop ? true : openSidebar;

	return (
		<div
			className={clsx({
				[classes.root]: true,
				[classes.shiftContent]: isDesktop,
			})}
		>
			<NotificationComponent />
			<Topbar id='back-to-top' onSidebarOpen={handleSidebarOpen} onSignOut={handleSignOut} />
			<Sidebar onClose={handleSidebarClose} open={shouldOpenSidebar} variant={isDesktop ? 'persistent' : 'temporary'} />
			<main className={clsx(classes.content, 'main-container')}>{children}</main>
			<ScrollTop {...props}>
				<Fab color='secondary' size='small' aria-label='scroll to top'>
					<KeyboardArrowUpIcon />
				</Fab>
			</ScrollTop>
			<Footer />
		</div>
	);
};

Main.propTypes = {
	children: PropTypes.node,
};

export default Main;
