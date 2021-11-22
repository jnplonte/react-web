import { ChangeEvent, FormEvent, useState } from 'react';

import { withRouter } from 'react-router-dom';

import validateJS from 'validate.js';
import md5 from 'md5';

import { Box, Grid, Button, TextField, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { GetAuth } from '../../provider/authentication/authentication.provider';
import { GetSiteInformation } from '../../provider/site-information/site-information.provider';

import { Helper } from '../../services/helper/helper.service';
import { AuthAPI } from '../../api/authentication.api';

import { IFormProps, schema, emptyForm } from './sign-in.constant';

import { signInStyle } from './sign-in.style';

const helper: Helper = new Helper();
const authRequest: AuthAPI = new AuthAPI();

const SignIn = (props: any) => {
	const { history } = props;

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
		<Box sx={[signInStyle.root]}>
			<Grid sx={signInStyle.grid} container>
				<Grid sx={signInStyle.quote} item lg={7}>
					<Typography sx={signInStyle.name} variant="h3" align="center">
						{process.env.REACT_APP_NAME}
					</Typography>
				</Grid>
				<Grid sx={signInStyle.content} item lg={5} xs={12}>
					<Box sx={[signInStyle.contentInner]}>
						<Box component="form" data-testid="submitform" sx={[signInStyle.form]} onSubmit={handleSignIn} noValidate>
							<Typography align="left" sx={signInStyle.title} variant="h4">
								{t('signin.signIn')}
							</Typography>
							<TextField
								data-testid="username"
								sx={signInStyle.textField}
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
								sx={signInStyle.textField}
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
								sx={signInStyle.signInButton}
								disabled={!formState.isValid}
								color="primary"
								fullWidth
								size="large"
								type="submit"
								variant="contained"
							>
								{t('signin.signIn')}
							</Button>
						</Box>
					</Box>
				</Grid>
			</Grid>
		</Box>
	);
};

export default withRouter(SignIn);
