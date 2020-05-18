import * as React from 'react';
import { Helmet } from 'react-helmet';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';

import Theme from './themes';
import Routes from './routes';

import { AuthProvider } from './provider/authentication/authentication.provider';
import { SiteInformationProvider } from './provider/site-information/site-information.provider';

const browserHistory = createBrowserHistory();

class App extends React.Component {
  public render() {
    return (
      <div className='app'>
        <Helmet>
          <title>{ process.env.REACT_APP_NAME }</title>
        </Helmet>
        <AuthProvider>
          <SiteInformationProvider>
            <ThemeProvider theme={Theme}>
              <Paper>
                <Router history={browserHistory}>
                  <Routes />
                </Router>
              </Paper>
            </ThemeProvider>
          </SiteInformationProvider>
        </AuthProvider>
      </div>
    );
  }
}

export default App;
