export interface ISchemaProps {
	password?: object;
	confirmPassword?: object;
}

export interface IFormProps {
	isValid: boolean;
	values: any;
	touched?: object;
	errors?: object;
}

const schema = (t: any): ISchemaProps => ({
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
});

const emptyForm: IFormProps = {
	isValid: false,
	values: {
		password: '',
		confirmPassword: '',
	},
	touched: {},
	errors: {},
};

export { schema, emptyForm };
