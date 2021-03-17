export interface ISchemaProps {
	username?: object;
	firstName?: object;
	lastName?: object;
	email?: object;
	phone?: object;
	roleId?: object;
	password?: object;
	confirmPassword?: object;
}

export interface IFormProps {
	isValid: boolean;
	values: object;
	touched?: object;
	errors?: object;
}

const schema = (t: any): ISchemaProps => {
	return {
		username: {
			presence: { allowEmpty: false, message: t('error.required') },
		},
		firstName: {
			presence: { allowEmpty: false, message: t('error.required') },
		},
		lastName: {
			presence: { allowEmpty: false, message: t('error.required') },
		},
		email: {
			presence: { allowEmpty: false, message: t('error.required') },
			email: { message: t('error.emailRequired') },
		},
	};
};

const inertSchema = (t: any): ISchemaProps => {
	return {
		password: {
			presence: { allowEmpty: false, message: t('error.required') },
			length: {
				minimum: 8,
				message: t('error.passwordInvalid'),
			},
		},
		confirmPassword: {
			equality: 'password',
		},
	};
};

const emptyForm: IFormProps = {
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
};

export { schema, inertSchema, emptyForm };
