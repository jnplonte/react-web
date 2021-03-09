import React from 'react';
import { withRouter } from 'react-router-dom';

import validateJS from 'validate.js';
import * as md5 from 'md5';
import { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { Grid, Button, TextField, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { GetAuth } from '../../provider/authentication/authentication.provider';
import { GetSiteInformation } from '../../provider/site-information/site-information.provider';

import { signInStyle } from './sign-in.style';

import { Helper } from '../../services/helper/helper.service';
import { AuthAPI } from '../../api/authenttication.api';

import { IFormProps, schema, emptyForm } from './sign-in.constant';

const helper: Helper = new Helper();
const authRequest: AuthAPI = new AuthAPI();

const SignIn = (props: any) => {
	const { history } = props;

	const classes: any = signInStyle();
	const { t } = useTranslation();

	const { setToken } = GetAuth();
	const { setNotificationData } = GetSiteInformation();

	const [formState, setFormState] = useState<IFormProps>(emptyForm);

	useEffect(() => {
		const errors = validateJS(formState.values, schema(t));
		setFormState((state: any) => ({
			...state,
			isValid: errors ? false : true,
			errors: errors || {},
		}));
	}, [t, formState.values]);

	const handleChange = (event: ChangeEvent<{ name?: string; value: unknown }>) => {
		event.persist();

		const target: HTMLInputElement = event.target as HTMLInputElement;
		setFormState((state: any) => helper.initFormState(state, target));
	};

	const handleSignIn = async (event: FormEvent) => {
		event.preventDefault();

		if (formState.isValid) {
			const apiData: object = {
				username: formState.values['username'],
				password: md5(formState.values['password']),
			};

			const requestData: any = await authRequest.login({}, apiData);
			setNotificationData({ type: requestData.type, message: t(requestData.message) });

			if (requestData.data) {
				setToken(requestData.data || '');
				history.push('/dashboard');
			}
		}
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
									{t('common.signIn')}
								</Typography>
								<TextField
									className={classes.textField}
									error={helper.hasFormError(formState, 'username')}
									fullWidth
									helperText={helper.hasFormError(formState, 'username', true)}
									label={t('form.username')}
									name='username'
									onChange={handleChange}
									type='text'
									value={formState.values['username'] || ''}
									variant='outlined'
								/>
								<TextField
									className={classes.textField}
									error={helper.hasFormError(formState, 'password')}
									fullWidth
									helperText={helper.hasFormError(formState, 'password', true)}
									label={t('form.password')}
									name='password'
									onChange={handleChange}
									type='password'
									value={formState.values['password'] || ''}
									variant='outlined'
								/>
								<Button
									className={classes.signInButton}
									disabled={!formState.isValid}
									color='primary'
									fullWidth
									size='large'
									type='submit'
									variant='contained'
								>
									{t('common.signIn')}
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
