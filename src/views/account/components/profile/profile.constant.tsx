export interface ISchemaProps {
	username?: object;
	firstName?: object;
	lastName?: object;
	email?: object;
	phone?: object;
}

export interface IFormProps {
	isValid: boolean;
	values: any;
	touched?: object;
	errors?: object;
}

const schema = (t: any): ISchemaProps => ({
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
});

const emptyForm: IFormProps = {
	isValid: false,
	values: {
		username: '',
		firstName: '',
		lastName: '',
		email: '',
		phone: '',
	},
	touched: {},
	errors: {},
};

export { schema, emptyForm };
