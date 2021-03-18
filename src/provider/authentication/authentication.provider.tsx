import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

import clsx from 'clsx';

import { makeStyles } from '@material-ui/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import { Helper } from '../../services/helper/helper.service';
import { UserAPI } from '../../api/user.api';

interface IContextProps {
	token: string;
	isLogin: boolean;
	authData: object;
	setToken: any;
	setAuthData: any;
}

export const AuthContext = createContext<IContextProps>({
	token: '',
	isLogin: false,
	authData: {},
	setToken: () => {},
	setAuthData: () => {},
});

const helper: Helper = new Helper();

const GetAuth = () => {
	return useContext(AuthContext);
};

const AuthProvider = (props: any) => {
	const { children } = props;

	const classes: any = makeStyles(() => ({
		root: {
			paddingTop: '15%',
			position: 'fixed',
			width: '100%',
			height: '100%',
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			zIndex: 9999,
			backgroundColor: '#F4F6F8',
		},
	}))();

	const authToken: string = helper.getCookie(process.env.REACT_APP_AUTH_COOKIE);

	const [tokenState, setTokenState] = useState(authToken);
	const [isLoginState, setIsLoginState] = useState(helper.isNotEmpty(authToken));
	const [authState, setAuthState] = useState({});

	const setTokenStateData = (token: string) => {
		setTokenState(token);
		helper.setCookie(process.env.REACT_APP_AUTH_COOKIE, token);
	};

	const fetchDataAsync = useCallback(async () => {
		const userRequest: UserAPI = new UserAPI(tokenState);

		const requestData: any = await userRequest.myuser();
		if (requestData.data) {
			setTimeout(() => {
				setIsLoginState(true);
			}, 500); // NOTE: intentional 0.5sec delaay for loading
			setAuthState(requestData.data);
		} else {
			setIsLoginState(false);
			setAuthState({});

			helper.deleteCookie(process.env.REACT_APP_AUTH_COOKIE);
		}
	}, [tokenState]);

	useEffect(() => {
		if (helper.isNotEmpty(tokenState)) {
			fetchDataAsync();
		} else {
			setIsLoginState(false);
			setAuthState({});

			helper.deleteCookie(process.env.REACT_APP_AUTH_COOKIE);
		}
	}, [tokenState, fetchDataAsync]);

	return (
		<AuthContext.Provider
			value={{
				token: tokenState,
				isLogin: isLoginState,
				authData: authState,
				setToken: setTokenStateData,
				setAuthData: fetchDataAsync,
			}}
		>
			{tokenState ? (
				<div className={clsx({ [classes.root]: true, hidden: isLoginState })}>
					<CircularProgress size={120} />
				</div>
			) : (
				''
			)}
			{children}
		</AuthContext.Provider>
	);
};

export { AuthProvider, GetAuth };
