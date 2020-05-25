import * as React from 'react';
import * as PropTypes from 'prop-types';

import clsx from 'clsx';
import { Link, withRouter } from 'react-router-dom';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

import { sidebarStyle } from './sidebar-nav.style';

const SidebarNav = (props: any) => {
  const { pages, location, className } = props;

  const classes: any = sidebarStyle();

  const path: string = location.pathname.split('/')[1];

  console.log(path, '<<<');

  return (
    <List className={clsx(classes.root, 'app-side-bar', className)}>
      {pages.map((page: any) => (
        <ListItem button className={clsx(classes.item,  {active: (path === page.name)})} disableGutters key={page.title} component={Link} to={page.href}>
          <ListItemIcon>
            {page.icon}
          </ListItemIcon>
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
