import * as React from 'react';
import * as PropTypes from 'prop-types';

import * as validate from 'validate.js';
import clsx from 'clsx';
import { FormEvent, ChangeEvent, useState, useEffect } from 'react';
import { Grid, Button, TextField, FormControl, InputLabel, Select, Typography } from '@material-ui/core';

import { userFormStyles } from './user-form.style';

import { Helper } from '../../../../services/helper/helper.service';

interface ISchemaProps {
  username?: object;
  firstName?: object;
  lastName?: object;
  email?: object;
  phone?: object;
  roleId?: object;
  password?: object;
  confirmPassword?: object;
}

const schema: ISchemaProps = {
  username: {
    presence: { allowEmpty: false, message: 'is required' },
  },
  firstName: {
    presence: { allowEmpty: false, message: 'is required' },
  },
  lastName: {
    presence: { allowEmpty: false, message: 'is required' },
  },
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: { message: 'is invalid' },
  },
};

const inertSchema: ISchemaProps = {
  password: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      minimum: 8,
      message: 'is invalid',
    },
  },
  confirmPassword: {
    equality: 'password',
  },
};

const helper: Helper = new Helper();

const UserForm = (props: any) => {
  const { className, onUpdate, onCancel, data, type } = props;

  const classes: any = userFormStyles();

  const [confirmText, setConfirmText] = useState('Update');
  const [confirmHeaderText, setConfirmHeaderText] = useState('Update User');

  const [formState, setFormState] = useState({
    isValid: false,
    values: {
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      roleId: process.env.REACT_APP_DEFAULT_ROLEID,
      password: '',
      confirmPassword: '',
    },
    touched: {},
    errors: {},
  });

  useEffect(() => {
    let updatedSchema: ISchemaProps = schema;
    if (type === 'insert') {
      updatedSchema = { ...schema, ...inertSchema };
    }

    const errors = validate(formState.values, updatedSchema);
    setFormState((state: any) => ({
        ...state,
        isValid: errors ? false : true,
        errors: errors || {},
      })
    );
  }, [formState.values]);

  useEffect(() => {
    if (type === 'update') {
      setFormState({
        isValid: !helper.isEmptyObject(data),
        values: {
          username: data['username'] || '',
          firstName: data['firstName'] || '',
          lastName: data['lastName'] || '',
          email: data['email'] || '',
          phone: data['phone'] || '',
          roleId: data['roleId'] || process.env.REACT_APP_DEFAULT_ROLEID,
          password: '',
          confirmPassword: '',
        },
        touched: {},
        errors: {},
      });
    }
  }, [data]);

  useEffect(() => {
    switch (type) {
      case 'insert':
        setConfirmText('Insert');
        setConfirmHeaderText('Insert User');
        break;

      case 'update':
        setConfirmText('Update');
        setConfirmHeaderText('Update User');
        break;
    }
  }, [type]);

  const handleChange = (event: ChangeEvent<{ name?: string; value: unknown }>) => {
    event.persist();

    const target: HTMLInputElement = event.target as HTMLInputElement;
    setFormState((state: any) => (helper.initFormState(state, target)));
  };

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();

    onUpdate(formState.values);
  };

  return (
    <div className={clsx(classes.root, className)}>
      <Typography variant='h4'>{confirmHeaderText}</Typography>
      <form className={classes.form} onSubmit={handleFormSubmit} noValidate>
        <Grid container spacing={3}>
          <Grid item xs={9}>
            <TextField
              autoComplete='off'
              disabled={type === 'update'}
              className={classes.textField}
              error={ helper.hasFormError(formState, 'username') }
              fullWidth
              helperText={ helper.hasFormError(formState, 'username', true) }
              label='Username'
              name='username'
              onChange={handleChange}
              type='text'
              value={formState.values['username'] || ''}
            />
          </Grid>
          <Grid item xs={3}>
            <FormControl
              disabled={Number(formState.values['roleId']) === 1}
              className={classes.textField}
              fullWidth>
              <InputLabel htmlFor='roleId'>Role</InputLabel>
              <Select
                native
                value={Number(formState.values['roleId'] || process.env.REACT_APP_DEFAULT_ROLEID)}
                onChange={handleChange}
                inputProps={{ name: 'roleId', id: 'roleId' }}>
                <option value={1} disabled>Super Admin</option>
                <option value={2}>Admin</option>
                <option value={3}>User</option>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete='off'
              className={classes.textField}
              error={ helper.hasFormError(formState, 'firstName') }
              fullWidth
              helperText={ helper.hasFormError(formState, 'firstName', true) }
              label='First Name'
              name='firstName'
              onChange={handleChange}
              type='text'
              value={formState.values['firstName'] || ''}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete='off'
              className={classes.textField}
              error={ helper.hasFormError(formState, 'lastName') }
              fullWidth
              helperText={ helper.hasFormError(formState, 'lastName', true) }
              label='Last Name'
              name='lastName'
              onChange={handleChange}
              type='text'
              value={formState.values['lastName'] || ''}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete='off'
              className={classes.textField}
              error={ helper.hasFormError(formState, 'email') }
              fullWidth
              helperText={ helper.hasFormError(formState, 'email', true) }
              label='Email'
              name='email'
              onChange={handleChange}
              type='text'
              value={formState.values['email'] || ''}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete='off'
              className={classes.textField}
              error={ helper.hasFormError(formState, 'phone') }
              fullWidth
              helperText={ helper.hasFormError(formState, 'phone', true) }
              label='Phone Number'
              name='phone'
              onChange={handleChange}
              type='text'
              value={formState.values['phone'] || ''}
            />
          </Grid>
        </Grid>
        {(type === 'insert')
          ?
            (<Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete='off'
                  className={classes.textField}
                  error={ helper.hasFormError(formState, 'password') }
                  fullWidth
                  helperText={ helper.hasFormError(formState, 'password', true) }
                  label='Password'
                  name='password'
                  onChange={handleChange}
                  type='password'
                  value={formState.values['password'] || ''}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete='off'
                  className={classes.textField}
                  error={ helper.hasFormError(formState, 'confirmPassword') }
                  fullWidth
                  helperText={ helper.hasFormError(formState, 'confirmPassword', true) }
                  label='Confirm Password'
                  name='confirmPassword'
                  onChange={handleChange}
                  type='password'
                  value={formState.values['confirmPassword'] || ''}
                />
              </Grid>
            </Grid>)
          :
            null
        }
        <div className='footer'>
          <Button onClick={onCancel} className='footerText' color='primary'>Cancel</Button>
          <Button disabled={!formState.isValid} type='submit' className='footerText' color='primary' autoFocus>{confirmText}</Button>
        </div>
      </form>
    </div>
  );
};

UserForm.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

export default UserForm;
