import { render, screen } from '@testing-library/react';

import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import '../../locales';

import { ThemeProvider } from '@material-ui/core/styles';
import Theme from '../../themes';
import { AuthProvider } from '../../provider/authentication/authentication.provider';
import { SiteInformationProvider } from '../../provider/site-information/site-information.provider';

import NotFound from './not-found.view';

it('should render not found page', () => {
	const history = createMemoryHistory();
	render(
		<AuthProvider>
			<SiteInformationProvider>
				<ThemeProvider theme={Theme}>
					<Router history={history}>
						<NotFound />
					</Router>
				</ThemeProvider>
			</SiteInformationProvider>
		</AuthProvider>
	);

	expect(screen.getByText(/PAGE NOT FOUND/i)).toBeInTheDocument();
});
