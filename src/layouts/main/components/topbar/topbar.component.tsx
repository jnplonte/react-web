import * as React from 'react';
import * as PropTypes from 'prop-types';

import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Hidden, IconButton, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import InputIcon from '@material-ui/icons/Input';

import { topbarStyle } from './topbar.style';

const Topbar = (props: any) => {
  const { className, onSignOut, onSidebarOpen, ...rest } = props;

  const classes = topbarStyle();

  return (
    <AppBar {...rest} className={clsx('app-header', classes.root, className)} color='primary' position='fixed'>
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
        <IconButton color='inherit' onClick={onSignOut}>
          <InputIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func,
  onSignOut: PropTypes.func,
};

export default Topbar;
