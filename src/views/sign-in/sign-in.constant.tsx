export interface ISchemaProps {
	username?: object;
	password?: object;
}

export interface IFormProps {
	isValid: boolean;
	values: any;
	touched?: object;
	errors?: object;
}

const schema = (t: any): ISchemaProps => ({
	username: {
		presence: { allowEmpty: false, message: t('error.usernameRequired') },
	},
	password: {
		presence: { allowEmpty: false, message: t('error.passwordRequired') },
		length: {
			minimum: 8,
			message: t('error.passwordInvalid'),
		},
	},
});

const emptyForm: IFormProps = {
	isValid: false,
	values: {
		username: '',
		password: '',
	},
	touched: {},
	errors: {},
};

export { schema, emptyForm };
