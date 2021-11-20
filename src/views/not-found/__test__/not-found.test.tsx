import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { MockViews } from '../../../react-app-test-helper';

import { createMemoryHistory } from 'history';
import NotFound from './../not-found.view';

describe('not found view', () => {
	it('should render not found page', () => {
		const history = createMemoryHistory();
		const route = '/not-found';
		history.push(route);

		render(<MockViews history={history} view={<NotFound />} />);

		const notFoundText = screen.getByText(/PAGE NOT FOUND/i);
		expect(notFoundText).toBeInTheDocument();

		const homePageButton = screen.getByText(/HOME PAGE/i);
		expect(homePageButton).toBeInTheDocument();
	});

	it('should go back to home page', async () => {
		const history = createMemoryHistory();
		const route = '/not-found';
		history.push(route);

		render(<MockViews history={history} view={<NotFound />} />);

		const gobackButton = screen.getByTestId(/goback/i);
		await act(async () => {
			fireEvent.click(gobackButton);
		});

		expect(history.location.pathname).toEqual('/');
	});
});
