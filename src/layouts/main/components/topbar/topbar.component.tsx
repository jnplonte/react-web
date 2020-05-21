import * as React from 'react';
import * as PropTypes from 'prop-types';

import clsx from 'clsx';

import { MouseEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Hidden, IconButton, Typography, Menu, MenuItem } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';

import { topbarStyle } from './topbar.style';

const Topbar = (props: any) => {
  const { className, onSignOut, onSidebarOpen } = props;

  const classes = topbarStyle();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: MouseEvent) => {
    const element = (event.currentTarget as HTMLElement);
    setAnchorEl(element);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
          <img className='img' alt={process.env.REACT_APP_NAME} title={process.env.REACT_APP_NAME} src={process.env.REACT_APP_LOGO}/>
          <Hidden smDown>
            <Typography variant='h6' className='title'>{process.env.REACT_APP_NAME}</Typography>
          </Hidden>
        </Link>
        <div className={classes.flexGrow} />
        <IconButton
            aria-label='account'
            aria-controls='menu-appbar'
            aria-haspopup='true'
            onClick={handleMenu}
            color='inherit'>
            <AccountCircle />
        </IconButton>
        <Menu
            id='account-appbar'
            anchorEl={anchorEl}
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            keepMounted
            transformOrigin={{vertical: 'top', horizontal: 'right'}}
            open={open}
            onClose={handleClose}>
          <MenuItem onClick={handleClose} component={Link} to='/account'>My Account</MenuItem>
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
