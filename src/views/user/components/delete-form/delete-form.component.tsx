import * as React from 'react';
import * as PropTypes from 'prop-types';

import clsx from 'clsx';
import {
  Button,
  DialogContent,
  DialogActions
} from '@material-ui/core';

import { deleteFormStyles } from './delete-form.style';

const DeleteForm = (props: any) => {
  const { className, onDelete, onCancel, data } = props;

  const classes: any = deleteFormStyles();

  return (
    <div className={clsx(classes.root, className)}>
      <DialogContent>
        <div>
          <p>Are you sure you want to delete this user?</p>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color='primary'>No</Button>
        <Button onClick={() => onDelete(data)} color='primary' autoFocus>Yes</Button>
      </DialogActions>
    </div>
  );
};

DeleteForm.propTypes = {
  className: PropTypes.string,
  onDelete: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

export default DeleteForm;
