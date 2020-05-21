import * as React from 'react';
import * as PropTypes from 'prop-types';

import clsx from 'clsx';
import { Avatar, Typography } from '@material-ui/core';

import { GetAuth } from '../../../../../../provider/authentication/authentication.provider';

import { profileStyle } from './profile.style';

const Profile = (props: any) => {
  const { className } = props;

  const classes: any = profileStyle();
  const { authData } = GetAuth();

  const user = {
    name: `${authData['firstName']} ${authData['lastName']}`,
    avatar: process.env.REACT_APP_LOGO,
    email: authData['email'],
  };

  return (
    <div className={clsx(classes.root, className)}>
      <Avatar alt={user.name} title={user.name} className={classes.avatar} src={user.avatar}/>
      <Typography className={classes.name} variant='h5'>{user.name}</Typography>
      <Typography variant='body2'>{user.email}</Typography>
    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string,
};

export default Profile;
