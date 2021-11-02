import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

it('should render page', () => {
	const { container } = render(<App />);

	expect(container.firstChild).toHaveClass('app');
});
