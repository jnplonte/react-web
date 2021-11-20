import { ChangeEvent, FormEvent, useState } from 'react';

import { withRouter } from 'react-router-dom';

import validateJS from 'validate.js';
import md5 from 'md5';

import { Grid, Button, TextField, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { GetAuth } from '../../provider/authentication/authentication.provider';
import { GetSiteInformation } from '../../provider/site-information/site-information.provider';

import { signInStyle } from './sign-in.style';

import { Helper } from '../../services/helper/helper.service';
import { AuthAPI } from '../../api/authentication.api';

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

	const handleChange = (event: ChangeEvent<{ name?: string; value: unknown }> | null) => {
		event?.persist();

		const target: HTMLInputElement = event?.target as HTMLInputElement;
		setFormState((state: any) => {
			const updatedState = helper.initFormState(state, target);
			const updatedError = validateJS(updatedState.values, schema(t), { fullMessages: false });

			return {
				...updatedState,
				isValid: updatedError ? false : true,
				errors: updatedError || {},
			};
		});
	};

	const handleSignIn = async (event: FormEvent | null) => {
		event?.preventDefault();

		if (formState.isValid) {
			const apiData: object = {
				username: formState.values['username'],
				password: md5(formState.values['password']),
			};

			const requestData: any = await authRequest.login({}, apiData);
			setNotificationData({ type: requestData.type, message: t(requestData.message) });

			if (requestData && requestData.data) {
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
								<Typography className={classes.name} variant="h3">
									{process.env.REACT_APP_NAME}
								</Typography>
							</div>
						</div>
					</div>
				</Grid>
				<Grid className={classes.content} item lg={5} xs={12}>
					<div className={classes.content}>
						<div className={classes.contentBody}>
							<form data-testid="submitform" className={classes.form} onSubmit={handleSignIn} noValidate>
								<Typography align="left" className={classes.title} variant="h4">
									{t('signin.signIn')}
								</Typography>
								<TextField
									data-testid="username"
									className={classes.textField}
									error={helper.hasFormError(formState, 'username')}
									fullWidth
									helperText={helper.hasFormError(formState, 'username', true)}
									label={t('form.username')}
									name="username"
									onChange={handleChange}
									type="text"
									value={formState.values['username'] || ''}
									variant="outlined"
								/>
								<TextField
									data-testid="password"
									className={classes.textField}
									error={helper.hasFormError(formState, 'password')}
									fullWidth
									helperText={helper.hasFormError(formState, 'password', true)}
									label={t('form.password')}
									name="password"
									onChange={handleChange}
									type="text"
									value={formState.values['password'] || ''}
									variant="outlined"
								/>
								<Button
									data-testid="signin"
									className={classes.signInButton}
									disabled={!formState.isValid}
									color="primary"
									fullWidth
									size="large"
									type="submit"
									variant="contained"
								>
									{t('signin.signIn')}
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
