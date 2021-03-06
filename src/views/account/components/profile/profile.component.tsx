import React from 'react';
import * as PropTypes from 'prop-types';

import validateJS from 'validate.js';
import clsx from 'clsx';
import { FormEvent, ChangeEvent, useState, useEffect } from 'react';
import { Grid, Typography, Divider, Button, TextField } from '@material-ui/core';

import { profileStyles } from './profile.style';

import { Helper } from '../../../../services/helper/helper.service';

import { IFormProps, schema, emptyForm } from './profile.constant';

const helper: Helper = new Helper();

const Profile = (props: any) => {
	const { className, onUpdate, data } = props;

	const classes: any = profileStyles();

	const [formState, setFormState] = useState<IFormProps>(emptyForm);

	useEffect(() => {
		const errors = validateJS(formState.values, schema);
		setFormState((state: any) => ({
			...state,
			isValid: errors ? false : true,
			errors: errors || {},
		}));
	}, [formState.values]);

	useEffect(() => {
		setFormState({
			isValid: !helper.isEmptyObject(data),
			values: {
				username: data['username'] || '',
				firstName: data['firstName'] || '',
				lastName: data['lastName'] || '',
				email: data['email'] || '',
				phone: data['phone'] || '',
			},
			touched: {},
			errors: {},
		});
	}, [data]);

	const handleChange = (event: ChangeEvent<{ name?: string; value: unknown }>) => {
		event.persist();

		const target: HTMLInputElement = event.target as HTMLInputElement;
		setFormState((state: any) => helper.initFormState(state, target));
	};

	const handleFormSubmit = (event: FormEvent) => {
		event.preventDefault();

		onUpdate(formState.values);
	};

	return (
		<div className={clsx(classes.root, className)}>
			<Typography variant='h4'>Profile</Typography>
			<Typography variant='body2'>Update User Profile</Typography>
			<Divider />
			<form className={classes.form} onSubmit={handleFormSubmit} noValidate>
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<TextField
							autoComplete='off'
							disabled={true}
							className={classes.textField}
							error={helper.hasFormError(formState, 'username')}
							fullWidth
							helperText={helper.hasFormError(formState, 'username', true)}
							label='Username'
							name='username'
							onChange={handleChange}
							type='text'
							value={formState.values['username'] || ''}
						/>
					</Grid>
				</Grid>
				<Grid container spacing={3}>
					<Grid item xs={12} sm={6}>
						<TextField
							autoComplete='off'
							className={classes.textField}
							error={helper.hasFormError(formState, 'firstName')}
							fullWidth
							helperText={helper.hasFormError(formState, 'firstName', true)}
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
							error={helper.hasFormError(formState, 'lastName')}
							fullWidth
							helperText={helper.hasFormError(formState, 'lastName', true)}
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
							error={helper.hasFormError(formState, 'email')}
							fullWidth
							helperText={helper.hasFormError(formState, 'email', true)}
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
							error={helper.hasFormError(formState, 'phone')}
							fullWidth
							helperText={helper.hasFormError(formState, 'phone', true)}
							label='Phone Number'
							name='phone'
							onChange={handleChange}
							type='text'
							value={formState.values['phone'] || ''}
						/>
					</Grid>
				</Grid>
				<Grid container spacing={3}>
					<Grid item xs={12} className='right-text'>
						<Button disabled={!formState.isValid} variant='contained' type='submit' color='primary' autoFocus>
							Update
						</Button>
					</Grid>
				</Grid>
			</form>
		</div>
	);
};

Profile.propTypes = {
	className: PropTypes.string,
	data: PropTypes.object,
	onUpdate: PropTypes.func.isRequired,
};

export default Profile;
