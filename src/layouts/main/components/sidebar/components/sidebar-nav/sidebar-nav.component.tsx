import * as React from 'react';
import * as PropTypes from 'prop-types';

import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

import { sidebarStyle } from './sidebar-nav.style';

const SidebarNav = (props: any) => {
  const { pages, className, ...rest } = props;

  const classes = sidebarStyle();

  return (
    <List
        {...rest}
        className={clsx(classes.root, className)}
      >
      {pages.map((page: any) => (
        <ListItem button className={classes.item} disableGutters key={page.title} component={Link} to={page.href}>
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

export default SidebarNav;
