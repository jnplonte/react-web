export interface ISchemaProps {
	username?: object;
	password?: object;
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
			presence: { allowEmpty: false, message: t('error.usernameRequired') },
		},
		password: {
			presence: { allowEmpty: false, message: t('error.passwordRequired') },
			length: {
				minimum: 8,
				message: t('error.passwordInvalid'),
			},
		},
	};
};

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
