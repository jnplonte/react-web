import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as md5 from 'md5';

import clsx from 'clsx';
import { useState } from 'react';
import { Button, Modal } from '@material-ui/core';

import { userToolbarStyles } from './user-toolbar.style';

import { GetAuth } from '../../../../provider/authentication/authentication.provider';
import { GetSiteInformation } from '../../../../provider/site-information/site-information.provider';
import { UserAPI } from '../../../../api/user.api';

import { UserForm } from '../../components';

const UserToolbar = (props: any) => {
  const { className, refreshData } = props;

  const classes: any = userToolbarStyles();

  const { token } = GetAuth();
  const { setNotificationData } = GetSiteInformation();

  const userRequest: UserAPI = new UserAPI(token);

  const [addModal, setAddModal] = useState(false);

  const handleAddOpen = () => {
    setAddModal(true);
  };

  const handleAddClose = () => {
    setAddModal(false);
  };

  const handleAddConfirm = async (data: object = {}) => {
    const apiData: object = {
      username: data['username'],
      email: data['email'],
      password: md5(data['password']),
      roleId: Number(data['roleId']),
      firstName: data['firstName'],
      lastName: data['lastName'],
      phone: data['phone'] || '',
    };

    const requestData: any = await userRequest.post(apiData);
    setNotificationData({type: requestData.type, message: requestData.message});

    if (requestData.data) {
      refreshData();
      setAddModal(false);
    }
  };

  return (
    <div className={clsx(classes.root, className)}>
      <Modal open={addModal} onClose={handleAddClose}>
          <div className={clsx(classes.root, 'modal')}>
              <UserForm onUpdate={handleAddConfirm} onCancel={handleAddClose} type='insert' data={{}} />
          </div>
      </Modal>
      <div className={classes.row}>
        <span className={classes.spacer} />
        <Button color='primary' variant='contained' onClick={handleAddOpen}>Insert User</Button>
      </div>
    </div>
  );
};

UserToolbar.propTypes = {
  className: PropTypes.string,
  refreshData: PropTypes.func.isRequired,
};

export default UserToolbar;
