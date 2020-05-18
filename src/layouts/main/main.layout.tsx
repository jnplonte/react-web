import * as React from 'react';
import * as PropTypes from 'prop-types';

import clsx from 'clsx';

import { SyntheticEvent, useState } from 'react';
import { useTheme } from '@material-ui/styles';
import { useMediaQuery } from '@material-ui/core';

import { mainStyle } from './main.style';
import { Sidebar, Topbar, Footer } from './components';

import { NotificationComponent } from '../../components';

import { GetAuth } from '../../provider/authentication/authentication.provider';

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

  const handleSignOut = (event: SyntheticEvent) => {
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
        <NotificationComponent/>
        <Topbar onSidebarOpen={handleSidebarOpen} onSignOut={handleSignOut}/>
        <Sidebar
          onClose={handleSidebarClose}
          open={shouldOpenSidebar}
          variant={isDesktop ? 'persistent' : 'temporary'}
        />
        <main className={clsx(classes.content, 'main-container')}>
          {children}
        </main>
        <Footer />
    </div>
  );
};

Main.propTypes = {
  children: PropTypes.node,
};

export default Main;
