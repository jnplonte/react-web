
export interface ISchemaProps {
    username?: object;
    firstName?: object;
    lastName?: object;
    email?: object;
    phone?: object;
}

export interface IFormProps {
    isValid: boolean;
    values: object;
    touched?: object;
    errors?: object;
}

const schema: ISchemaProps = {
    username: {
      presence: { allowEmpty: false, message: 'is required' },
    },
    firstName: {
      presence: { allowEmpty: false, message: 'is required' },
    },
    lastName: {
      presence: { allowEmpty: false, message: 'is required' },
    },
    email: {
      presence: { allowEmpty: false, message: 'is required' },
      email: { message: 'is invalid' },
    },
};

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
