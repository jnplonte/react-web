import * as React from 'react';
import * as ReactDOM from 'react-dom';

import './locale';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './styles/css/index.css';

ReactDOM.render(
  <App />,
  document.getElementById('jnpl-root') as HTMLElement
);
registerServiceWorker();
