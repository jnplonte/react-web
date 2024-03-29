import React, { FormEvent, ChangeEvent, useState, useEffect } from 'react';

import * as PropTypes from 'prop-types';

import validateJS from 'validate.js';

import {
	Box,
	Grid,
	Button,
	InputLabel,
	TextField,
	FormControl,
	Card,
	CardContent,
	CardHeader,
	MenuItem,
} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { useTranslation } from 'react-i18next';

import PeopleIcon from '@mui/icons-material/People';
import EditIcon from '@mui/icons-material/Edit';

import { userFormStyles } from './user-form.style';

import { Helper } from '../../../../services/helper/helper.service';

import { ISchemaProps, IFormProps, schema, inertSchema, emptyForm } from '../../user.constant';

const helper: Helper = new Helper();

const UserForm = (props: any) => {
	const { className, onUpdate, onCancel, data, type } = props;

	const { t } = useTranslation();

	const [confirmText, setConfirmText] = useState(t('user.confirnInsert'));
	const [confirmIcon, setConfirmIcon] = useState(<EditIcon />);
	const [confirmHeaderText, setConfirmHeaderText] = useState(t('user.headerInsert'));

	const [formState, setFormState] = useState<IFormProps>(emptyForm);

	useEffect(() => () => setFormState(emptyForm), []);

	useEffect(() => {
		let updatedSchema: ISchemaProps = schema(t);
		if (type === 'insert') {
			updatedSchema = { ...schema(t), ...inertSchema(t) };
		}

		const errors = validateJS(formState.values, updatedSchema, { fullMessages: false });
		setFormState((state: any) => ({
			...state,
			isValid: errors ? false : true,
			errors: errors || {},
		}));
	}, [t, type, formState.values]);

	useEffect(() => {
		switch (type) {
			case 'insert':
				setFormState(emptyForm);
				break;

			case 'update':
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
				break;
		}
	}, [type, data]);

	useEffect(() => {
		switch (type) {
			case 'insert':
				setConfirmText(t('user.confirnInsert'));
				setConfirmIcon(<PeopleIcon />);
				setConfirmHeaderText(t('user.headerInsert'));
				break;

			case 'update':
				setConfirmText(t('user.confirmUpdate'));
				setConfirmIcon(<EditIcon />);
				setConfirmHeaderText(t('user.headerUpdate'));
				break;
		}
	}, [t, type]);

	const handleChange = (event: ChangeEvent<{ name?: string; value: unknown }> | null) => {
		event?.persist();

		const target: HTMLInputElement = event?.target as HTMLInputElement;
		setFormState((state: any) => helper.initFormState(state, target));
	};

	const handleChangeSelect = (event: SelectChangeEvent<{ name?: string; value: unknown }> | null) => {
		const target: HTMLInputElement = event?.target as HTMLInputElement;
		setFormState((state: any) => helper.initFormState(state, target));
	};

	const handleFormSubmit = (event: FormEvent | null) => {
		event?.preventDefault();

		onUpdate(formState.values);
	};

	return (
		<Card sx={[userFormStyles.root]} className={className}>
			<CardHeader className="header" avatar={confirmIcon} title={confirmHeaderText}></CardHeader>
			<CardContent>
				<Box component="form" onSubmit={handleFormSubmit} noValidate>
					<Grid container spacing={3}>
						<Grid item xs={8}>
							<TextField
								autoComplete="off"
								disabled={type === 'update'}
								sx={userFormStyles.textField}
								error={helper.hasFormError(formState, 'username')}
								fullWidth
								helperText={helper.hasFormError(formState, 'username', true)}
								label={t('form.username')}
								name="username"
								onChange={handleChange}
								type="text"
								value={formState.values['username'] || ''}
							/>
						</Grid>
						<Grid item xs={4}>
							<FormControl disabled={Number(formState.values['roleId']) === 1} sx={userFormStyles.textField} fullWidth>
								<InputLabel id="role">{t('form.roles')}</InputLabel>
								<Select
									labelId="role"
									id="role"
									value={formState.values['roleId'] || process.env.REACT_APP_DEFAULT_ROLEID}
									onChange={handleChangeSelect}
									autoWidth
									inputProps={{ name: 'roleId', id: 'roleId' }}
									label={t('form.roles')}
								>
									<MenuItem value={1} disabled>
										Super Admin
									</MenuItem>
									<MenuItem value={2}>Admin</MenuItem>
									<MenuItem value={3}>User</MenuItem>
								</Select>
							</FormControl>
						</Grid>
					</Grid>
					<Grid container spacing={3}>
						<Grid item xs={12} sm={6}>
							<TextField
								autoComplete="off"
								sx={userFormStyles.textField}
								error={helper.hasFormError(formState, 'firstName')}
								fullWidth
								helperText={helper.hasFormError(formState, 'firstName', true)}
								label={t('form.firstName')}
								name="firstName"
								onChange={handleChange}
								type="text"
								value={formState.values['firstName'] || ''}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								autoComplete="off"
								sx={userFormStyles.textField}
								error={helper.hasFormError(formState, 'lastName')}
								fullWidth
								helperText={helper.hasFormError(formState, 'lastName', true)}
								label={t('form.lastName')}
								name="lastName"
								onChange={handleChange}
								type="text"
								value={formState.values['lastName'] || ''}
							/>
						</Grid>
					</Grid>
					<Grid container spacing={3}>
						<Grid item xs={12} sm={6}>
							<TextField
								autoComplete="off"
								sx={userFormStyles.textField}
								error={helper.hasFormError(formState, 'email')}
								fullWidth
								helperText={helper.hasFormError(formState, 'email', true)}
								label={t('form.email')}
								name="email"
								onChange={handleChange}
								type="text"
								value={formState.values['email'] || ''}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								autoComplete="off"
								sx={userFormStyles.textField}
								error={helper.hasFormError(formState, 'phone')}
								fullWidth
								helperText={helper.hasFormError(formState, 'phone', true)}
								label="Phone Number"
								name="phone"
								onChange={handleChange}
								type="text"
								value={formState.values['phone'] || ''}
							/>
						</Grid>
					</Grid>
					{type === 'insert' ? (
						<Grid container spacing={3}>
							<Grid item xs={12} sm={6}>
								<TextField
									autoComplete="off"
									sx={userFormStyles.textField}
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
									sx={userFormStyles.textField}
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
					) : null}
					<Box className="footer">
						<Button onClick={onCancel} className="footerText" color="primary">
							{t('general.cancel')}
						</Button>
						<Button disabled={!formState.isValid} variant="contained" type="submit" color="primary" autoFocus>
							{confirmText}
						</Button>
					</Box>
				</Box>
			</CardContent>
		</Card>
	);
};

UserForm.propTypes = {
	className: PropTypes.string,
	type: PropTypes.string.isRequired,
	onUpdate: PropTypes.func.isRequired,
	onCancel: PropTypes.func.isRequired,
	data: PropTypes.any.isRequired,
};

export default UserForm;
