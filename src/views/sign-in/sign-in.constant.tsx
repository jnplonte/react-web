
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

const schema: ISchemaProps = {
    username: {
      presence: { allowEmpty: false, message: 'is required' },
    },
    password: {
      presence: { allowEmpty: false, message: 'is required' },
      length: {
        minimum: 8,
        message: 'is invalid',
      },
    },
};

export { schema };
