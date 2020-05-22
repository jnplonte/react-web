
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

const inertSchema: ISchemaProps = {
    password: {
      presence: { allowEmpty: false, message: 'is required' },
      length: {
        minimum: 8,
        message: 'is invalid',
      },
    },
    confirmPassword: {
      equality: 'password',
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
      roleId: process.env.REACT_APP_DEFAULT_ROLEID,
      password: '',
      confirmPassword: '',
    },
    touched: {},
    errors: {},
};

export { schema, inertSchema, emptyForm };
