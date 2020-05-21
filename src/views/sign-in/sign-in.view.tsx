import * as React from 'react';
import { withRouter } from 'react-router-dom';

import * as validate from 'validate.js';
import * as md5 from 'md5';
import { ChangeEvent, FormEvent, useState, useEffect } from 'react';

import {
  Grid,
  Button,
  TextField,
  Typography,
} from '@material-ui/core';

import { GetAuth } from '../../provider/authentication/authentication.provider';
import { GetSiteInformation } from '../../provider/site-information/site-information.provider';

import { AuthAPI } from '../../api/authenttication.api';

import { signInStyle } from './sign-in.style';

interface ISchemaProps {
  username?: object;
  password?: object;
}

const schema: ISchemaProps = {
  username: {
    presence: { allowEmpty: false, message: 'is required' },
  },
  password: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      minimum: 8,
      message: 'is invalid',
    },
  },
};

const authRequest: AuthAPI = new AuthAPI();

const SignIn = (props: any) => {
  const { history } = props;

  const classes: any = signInStyle();

  const { setToken } = GetAuth();
  const { setNotificationData } = GetSiteInformation();

  const [formState, setFormState] = useState({
    isValid: false,
    values: {
      username: 'spiderman',
      password: 'password',
    },
    touched: {},
    errors: {},
  });

  useEffect(() => {
    const errors = validate(formState.values, schema);
    setFormState((state: any) => ({
        ...state,
        isValid: errors ? false : true,
        errors: errors || {},
      })
    );
  }, [formState.values]);

  const handleChange = (event: ChangeEvent) => {
    event.persist();

    const target: HTMLInputElement = event.target as HTMLInputElement;

    setFormState((state: any) => ({
      ...state,
      values: {
        ...state.values,
        [target.name]:
        target.type === 'checkbox' ? target.checked : target.value,
      },
      touched: {
        ...state.touched,
        [target.name]: true,
      },
    }));
  };

  const handleSignIn = async (event: FormEvent) => {
    event.preventDefault();

    if (formState.isValid) {
      const apiData: object = {
        username: formState.values['username'],
        password: md5(formState.values['password']),
      };

      const requestData: any = await authRequest.login({}, apiData);

      if (requestData.status && requestData.status === 'success') {
        setNotificationData({type: 'success', message: 'login success'});

        setToken(requestData.data || '');
        history.push('/dashboard');
      } else {
        setNotificationData({type: 'error', message: 'invalid username or password'});
      }
    }
  };

  const hasError = (field: string) => {
    return formState.touched[field] && formState.errors[field] ? true : false;
  };

  return (
    <div className={classes.root}>
      <Grid className={classes.grid} container>
        <Grid className={classes.quoteContainer} item lg={7}>
          <div className={classes.quote}>
            <div className={classes.quoteInner}>
              <div className={classes.person}>
                <Typography className={classes.name} variant='h3'>
                  {process.env.REACT_APP_NAME}
                </Typography>
              </div>
            </div>
          </div>
        </Grid>
        <Grid className={classes.content} item lg={5} xs={12}>
          <div className={classes.content}>
            <div className={classes.contentBody}>
              <form className={classes.form} onSubmit={handleSignIn} noValidate>
                <Typography align='left' className={classes.title} variant='h4'>
                  Sign In
                </Typography>
                <TextField
                  className={classes.textField}
                  error={hasError('username')}
                  fullWidth
                  helperText={
                    hasError('username') ? formState.errors['username'][0] : null
                  }
                  label='Username'
                  name='username'
                  onChange={handleChange}
                  type='text'
                  value={formState.values['username'] || ''}
                  variant='outlined'
                />
                <TextField
                  className={classes.textField}
                  error={hasError('password')}
                  fullWidth
                  helperText={
                    hasError('password') ? formState.errors['password'][0] : null
                  }
                  label='Password'
                  name='password'
                  onChange={handleChange}
                  type='password'
                  value={formState.values['password'] || ''}
                  variant='outlined'
                />
                <Button className={classes.signInButton} color='primary'
                  disabled={!formState.isValid}
                  fullWidth size='large' type='submit' variant='contained'>
                  Sign In
                </Button>
              </form>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default withRouter(SignIn);
