import * as React from 'react';
import * as PropTypes from 'prop-types';

import clsx from 'clsx';
import { useState } from 'react';
import { Button, Modal } from '@material-ui/core';

import { userToolbarStyles } from './user-toolbar.style';

import { UserForm } from '../../components';

const UserToolbar = (props: any) => {
  const { className } = props;

  const classes: any = userToolbarStyles();

  const [addModal, setAddModal] = useState(false);

  const handleAddOpen = () => {
    setAddModal(true);
  };

  const handleAddClose = () => {
    setAddModal(false);
  };

  const handleAddConfirm = async (data: object = {}) => {
    console.log('add', data);
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
        <Button color='primary' variant='contained' onClick={handleAddOpen}>Add User</Button>
      </div>
    </div>
  );
};

UserToolbar.propTypes = {
  className: PropTypes.string,
};

export default UserToolbar;
