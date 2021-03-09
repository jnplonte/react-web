import React from 'react';
import * as PropTypes from 'prop-types';

import clsx from 'clsx';

import { MouseEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Hidden, IconButton, Typography, Menu, MenuItem } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import GTranslate from '@material-ui/icons/GTranslateOutlined';

import { topbarStyle } from './topbar.style';

const Topbar = (props: any) => {
	const { className, onSignOut, onSidebarOpen } = props;

	const classes = topbarStyle();
	const { i18n } = useTranslation();

	const [localeEl, setLocaleEl] = useState<null | HTMLElement>(null);
	const localeOpen = Boolean(localeEl);

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const anchorOpen = Boolean(anchorEl);

	const handleLocale = (event: MouseEvent) => {
		const element = event.currentTarget as HTMLElement;
		setLocaleEl(element);
	};

	const handleMenu = (event: MouseEvent) => {
		const element = event.currentTarget as HTMLElement;
		setAnchorEl(element);
	};

	const localeClose = () => {
		setLocaleEl(null);
	};

	const anchorClose = () => {
		setAnchorEl(null);
	};

	const setLocale = (locale: string = 'en') => {
		const lngKey: string = process.env.REACT_APP_LOCALE || '';

		i18n.changeLanguage(locale);
		window.localStorage.setItem(lngKey, locale);
		localeClose();
	};

	return (
		<AppBar className={clsx('app-header', classes.root, className)} color='primary' position='fixed'>
			<Toolbar>
				<Hidden lgUp>
					<IconButton className={classes.menuButton} color='inherit' onClick={onSidebarOpen}>
						<MenuIcon />
					</IconButton>
				</Hidden>
				<Link to='/'>
					<img
						className='img'
						alt={process.env.REACT_APP_NAME}
						title={process.env.REACT_APP_NAME}
						src={process.env.REACT_APP_LOGO}
					/>
					<Hidden smDown>
						<Typography variant='h6' className='title'>
							{process.env.REACT_APP_NAME}
						</Typography>
					</Hidden>
				</Link>
				<div className={classes.flexGrow} />
				<IconButton aria-haspopup='true' onClick={handleLocale} color='inherit'>
					<GTranslate />
					<Typography variant='body1' className={classes.lang}>
						{i18n.language.toUpperCase()}
					</Typography>
				</IconButton>
				<Menu
					id='locale-appbar'
					anchorEl={localeEl}
					anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
					keepMounted
					transformOrigin={{ vertical: 'top', horizontal: 'right' }}
					open={localeOpen}
					onClose={localeClose}
				>
					<MenuItem onClick={() => setLocale('en')}>ENGLISH</MenuItem>
					<MenuItem onClick={() => setLocale('tg')}>TAGALOG</MenuItem>
				</Menu>
				<IconButton aria-haspopup='true' onClick={handleMenu} color='inherit'>
					<AccountCircle />
				</IconButton>
				<Menu
					id='account-appbar'
					anchorEl={anchorEl}
					anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
					keepMounted
					transformOrigin={{ vertical: 'top', horizontal: 'right' }}
					open={anchorOpen}
					onClose={anchorClose}
				>
					<MenuItem onClick={anchorClose} component={Link} to='/account'>
						My Account
					</MenuItem>
					<MenuItem onClick={onSignOut}>Sign Out</MenuItem>
				</Menu>
			</Toolbar>
		</AppBar>
	);
};

Topbar.propTypes = {
	className: PropTypes.string,
	onSidebarOpen: PropTypes.func,
	onSignOut: PropTypes.func,
	id: PropTypes.string,
};

export default Topbar;
