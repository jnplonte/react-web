import { Component } from 'react';

import { Helmet, HelmetProvider } from 'react-helmet-async';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';

import { ThemeProvider } from '@mui/material/styles';

import Theme from './themes';
import Routes from './routes';

import { AuthProvider } from './provider/authentication/authentication.provider';
import { SiteInformationProvider } from './provider/site-information/site-information.provider';

const browserHistory = createBrowserHistory();

class App extends Component {
	public render() {
		return (
			<HelmetProvider>
				<div className="app">
					<Helmet>
						<title>{process.env.REACT_APP_NAME}</title>
					</Helmet>
					<AuthProvider>
						<SiteInformationProvider>
							<ThemeProvider theme={Theme}>
								<Router history={browserHistory}>
									<Routes />
								</Router>
							</ThemeProvider>
						</SiteInformationProvider>
					</AuthProvider>
				</div>
			</HelmetProvider>
		);
	}
}

export default App;
