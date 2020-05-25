export interface ISchemaProps {
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
      password: '',
      confirmPassword: '',
    },
    touched: {},
    errors: {},
};

export { schema, emptyForm };
