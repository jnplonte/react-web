import * as React from 'react';
import * as PropTypes from 'prop-types';

import * as validate from 'validate.js';
import clsx from 'clsx';
import { FormEvent, ChangeEvent, useState, useEffect } from 'react';
import {
  Grid,
  Typography,
  Divider,
  Button,
  TextField
} from '@material-ui/core';

import { passwordStyles } from './password.style';

import { Helper } from '../../../../services/helper/helper.service';

import { IFormProps, schema, emptyForm } from './password.constant';

const helper: Helper = new Helper();

const Password = (props: any) => {
  const { className, onUpdate } = props;

  const classes: any = passwordStyles();

  const [formState, setFormState] = useState<IFormProps>(emptyForm);

  useEffect(() => {
    const errors = validate(formState.values, schema);
    setFormState((state: any) => ({
        ...state,
        isValid: errors ? false : true,
        errors: errors || {},
      })
    );
  }, [formState.values]);

  const handleChange = (event: ChangeEvent<{ name?: string; value: unknown }>) => {
    event.persist();

    const target: HTMLInputElement = event.target as HTMLInputElement;
    setFormState((state: any) => (helper.initFormState(state, target)));
  };

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();

    onUpdate(formState.values);
  };

  return (
    <div className={clsx(classes.root, className)}>
      <Typography variant='h4'>Password</Typography>
      <Typography variant='body2'>Update User Password</Typography>
      <Divider />
      <form className={classes.form} onSubmit={handleFormSubmit} noValidate>
        <Grid container spacing={3}>
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
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} className='right-text'>
            <Button disabled={!formState.isValid} variant='contained' type='submit' color='primary' autoFocus>Update</Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

Password.propTypes = {
  className: PropTypes.string,
  data: PropTypes.object,
  onUpdate: PropTypes.func.isRequired,
};

export default Password;
