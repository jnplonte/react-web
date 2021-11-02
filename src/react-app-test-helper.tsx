import { Router } from 'react-router-dom';

import './locales';

import { ThemeProvider } from '@material-ui/core/styles';
import Theme from './themes';

import { AuthProvider } from './provider/authentication/authentication.provider';
import { SiteInformationProvider } from './provider/site-information/site-information.provider';

const MockViews = (props: any) => {
	const { history, view } = props;

	return (
		<AuthProvider>
			<SiteInformationProvider>
				<ThemeProvider theme={Theme}>
					<Router history={history}>{view}</Router>
				</ThemeProvider>
			</SiteInformationProvider>
		</AuthProvider>
	);
};

export { MockViews };
