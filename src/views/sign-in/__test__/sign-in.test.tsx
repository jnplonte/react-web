import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

// import axios from 'axios';
// import MockAdapter from 'axios-mock-adapter';
import mockAxios from 'jest-mock-axios';

import { MockViews } from '../../../react-app-test-helper';

import { createMemoryHistory } from 'history';

import SignIn from './../sign-in.view';

// const mock: any = new MockAdapter(axios);
// const url: string = process.env['REACT_APP_API'] as string;
describe('sign in view', () => {
	afterEach(() => {
		mockAxios.reset();
	});

	it('should render sign in page', () => {
		const history = createMemoryHistory();
		const route = '/';
		history.push(route);

		render(<MockViews history={history} view={<SignIn />} />);

		const signInText = screen.getByText(/REACT WEB APPLICATION/i);

		const userNameField = screen.getByTestId(/username/i);
		const passwordField = screen.getByTestId(/password/i);
		const signInButton = screen.getByTestId(/signin/i);

		expect(signInText).toBeInTheDocument();

		expect(userNameField).toBeInTheDocument();
		expect(passwordField).toBeInTheDocument();
		expect(signInButton).toBeInTheDocument();
	});

	it('should sign in user', async () => {
		const history = createMemoryHistory();
		const route = '/';
		history.push(route);

		render(<MockViews history={history} view={<SignIn />} />);

		const userNameField: any = screen.getByTestId(/username/i).querySelector('input');
		await act(async () => {
			fireEvent.change(userNameField, { target: { value: 'spiderman' } });
		});

		expect(userNameField.value).toBe('spiderman');

		const passwordField: any = screen.getByTestId(/password/i).querySelector('input');
		await act(async () => {
			fireEvent.change(passwordField, { target: { value: 'passwordA1' } });
		});

		expect(passwordField.value).toBe('passwordA1');

		const signInForm = screen.getByTestId(/submitform/i);
		await act(async () => {
			const loginData = {
				status: 'success',
				message: 'login-success',
				executionTime: 0,
				data: '',
			};
			// mock.onPost(`${url}/v1/auth/login`).reply(200, loginData);
			mockAxios.request.mockResolvedValueOnce({ status: 200, data: loginData });

			fireEvent.submit(signInForm);
		});

		expect(mockAxios.request).toHaveBeenCalled();
	});
});
