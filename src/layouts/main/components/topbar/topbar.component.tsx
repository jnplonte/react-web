import React, { MouseEvent, useState } from 'react';

import * as PropTypes from 'prop-types';

import clsx from 'clsx';

import { Link } from 'react-router-dom';
import { Box, AppBar, Toolbar, Hidden, IconButton, Button, Typography, Menu, MenuItem } from '@mui/material';
import { useTranslation } from 'react-i18next';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import GTranslate from '@mui/icons-material/GTranslateOutlined';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { topbarStyle } from './topbar.style';

const Topbar = (props: any) => {
	const { className, onSignOut, onSidebarOpen } = props;

	const { i18n, t } = useTranslation();

	const [localeEl, setLocaleEl] = useState<null | HTMLElement>(null);
	const localeOpen = Boolean(localeEl);

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const anchorOpen = Boolean(anchorEl);

	const handleLocale = (event: MouseEvent | null) => {
		const element = event?.currentTarget as HTMLElement;
		setLocaleEl(element);
	};

	const handleMenu = (event: MouseEvent | null) => {
		const element = event?.currentTarget as HTMLElement;
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
		<Box sx={[topbarStyle.root]}>
			<AppBar className={clsx('app-header', className)} color="primary" position="fixed">
				<Toolbar>
					<Hidden lgUp>
						<IconButton sx={topbarStyle.menuButton} color="inherit" onClick={onSidebarOpen} size="large">
							<MenuIcon />
						</IconButton>
					</Hidden>
					<Box component="div" sx={[topbarStyle.link]}>
						<Link to="/">
							<img
								className="img"
								alt={process.env.REACT_APP_NAME}
								title={process.env.REACT_APP_NAME}
								src={process.env.REACT_APP_LOGO}
							/>
							<Hidden mdDown>
								<Typography variant="h6" className="title">
									{process.env.REACT_APP_NAME}
								</Typography>
							</Hidden>
						</Link>
					</Box>

					<Button aria-haspopup="true" onClick={handleLocale} color="inherit">
						<GTranslate />
						<Typography variant="body1" sx={topbarStyle.lang}>
							{i18n.language.toUpperCase()}
						</Typography>
						<ArrowDropDownIcon />
					</Button>
					<Menu
						id="locale-appbar"
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

					<IconButton aria-haspopup="true" onClick={handleMenu} color="inherit" size="large">
						<AccountCircle />
					</IconButton>
					<Menu
						id="account-appbar"
						anchorEl={anchorEl}
						anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
						keepMounted
						transformOrigin={{ vertical: 'top', horizontal: 'right' }}
						open={anchorOpen}
						onClose={anchorClose}
					>
						<MenuItem onClick={anchorClose} component={Link} to="/account">
							{t('menu.account')}
						</MenuItem>
						<MenuItem onClick={onSignOut}>{t('menu.signOut')}</MenuItem>
					</Menu>
				</Toolbar>
			</AppBar>
		</Box>
	);
};

Topbar.propTypes = {
	className: PropTypes.string,
	onSidebarOpen: PropTypes.func,
	onSignOut: PropTypes.func,
	id: PropTypes.string,
};

export default Topbar;
