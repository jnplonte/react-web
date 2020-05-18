import * as React from 'react';
import * as PropTypes from 'prop-types';

import clsx from 'clsx';
import { Divider, Drawer } from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SettingsIcon from '@material-ui/icons/Settings';

import { Profile, SidebarNav } from './components';
import { sidebarStyle } from './sidebar.style';

const Sidebar = (props: any) => {
  const { open, variant, onClose, className, ...rest } = props;

  const classes = sidebarStyle();

  const pages = [
    {
      title: 'Dashboard',
      href: '/dashboard',
      icon: <DashboardIcon />,
    },
    {
      title: 'Users',
      href: '/users',
      icon: <PeopleIcon />,
    },
    {
      title: 'Account',
      href: '/account',
      icon: <AccountBoxIcon />,
    },
    {
      title: 'Settings',
      href: '/settings',
      icon: <SettingsIcon />,
    },
  ];

  return (
    <Drawer anchor='left' classes={{ paper: classes.drawer }} onClose={onClose} open={open} variant={variant}>
      <div {...rest} className={clsx(classes.root, className)}>
        <Profile />
        <Divider className={classes.divider} />
        <SidebarNav className={classes.nav} pages={pages} />
      </div>
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
