import { StrictMode } from 'react';

import ReactDOM from 'react-dom';

import './locales';

import './styles/sass/index.scss';

import App from './App';

// import reportWebVitals from './reportWebVitals';

ReactDOM.render(
	<StrictMode>
		<App />
	</StrictMode>,
	document.getElementById('jnpl-root') as HTMLElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
