import * as PropTypes from 'prop-types';

import validateJS from 'validate.js';
import { FormEvent, ChangeEvent, useState, useEffect } from 'react';
import { Box, Grid, Typography, Button, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { passwordStyles } from './password.style';

import { Helper } from '../../../../services/helper/helper.service';

import { IFormProps, schema, emptyForm } from './password.constant';

const helper: Helper = new Helper();

const Password = (props: any) => {
	const { className, onUpdate } = props;

	const { t } = useTranslation();

	const [formState, setFormState] = useState<IFormProps>(emptyForm);

	useEffect(() => {
		const errors = validateJS(formState.values, schema(t), { fullMessages: false });
		setFormState((state: any) => ({
			...state,
			isValid: errors ? false : true,
			errors: errors || {},
		}));
	}, [t, formState.values]);

	const handleChange = (event: ChangeEvent<{ name?: string; value: unknown }> | null) => {
		event?.persist();

		const target: HTMLInputElement = event?.target as HTMLInputElement;
		setFormState((state: any) => helper.initFormState(state, target));
	};

	const handleFormSubmit = (event: FormEvent | null) => {
		event?.preventDefault();

		onUpdate(formState.values);
		setFormState(emptyForm);
	};

	return (
		<Box sx={[passwordStyles.root]} className={className}>
			<Typography variant="h4">{t('account.password')}</Typography>
			<Box component="form" sx={passwordStyles.form} onSubmit={handleFormSubmit} noValidate>
				<Grid container spacing={3}>
					<Grid item xs={12} sm={6}>
						<TextField
							autoComplete="off"
							sx={passwordStyles.textField}
							error={helper.hasFormError(formState, 'password')}
							fullWidth
							helperText={helper.hasFormError(formState, 'password', true)}
							label={t('form.password')}
							name="password"
							onChange={handleChange}
							type="password"
							value={formState.values['password'] || ''}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							autoComplete="off"
							sx={passwordStyles.textField}
							error={helper.hasFormError(formState, 'confirmPassword')}
							fullWidth
							helperText={helper.hasFormError(formState, 'confirmPassword', true)}
							label={t('form.confirmPassword')}
							name="confirmPassword"
							onChange={handleChange}
							type="password"
							value={formState.values['confirmPassword'] || ''}
						/>
					</Grid>
				</Grid>
				<Grid container spacing={3}>
					<Grid item xs={12} className="right-text">
						<Button
							sx={passwordStyles.button}
							disabled={!formState.isValid}
							variant="contained"
							type="submit"
							color="primary"
							autoFocus
						>
							{t('account.updatePassword')}
						</Button>
					</Grid>
				</Grid>
			</Box>
		</Box>
	);
};

Password.propTypes = {
	className: PropTypes.string,
	data: PropTypes.object,
	onUpdate: PropTypes.func.isRequired,
};

export default Password;
