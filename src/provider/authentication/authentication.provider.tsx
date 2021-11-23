import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

import clsx from 'clsx';

import { Box, CircularProgress } from '@mui/material';

import { Helper } from '../../services/helper/helper.service';
import { UserAPI } from '../../api/user.api';

interface IAuthDataProps {
	id: string;
	username: string;
	firstName: string;
	lastName: string;
	phone: string | null;
	email: string | null;
	roleId: number;
	languageId: number;
	countryId: number;
	active: boolean;
	verified: boolean;
}

interface IContextProps {
	token: string;
	isLogin: boolean;
	authData: IAuthDataProps | null;
	setToken: any;
	setAuthData: any;
}

export const AuthContext = createContext<IContextProps>({
	token: '',
	isLogin: false,
	authData: null,
	setToken: () => ({}),
	setAuthData: () => ({}),
});

const helper: Helper = new Helper();

const GetAuth = () => useContext(AuthContext);

const AuthProvider = (props: any) => {
	const { children } = props;

	const authToken: string = helper.getCookie(process.env.REACT_APP_AUTH_COOKIE);

	const [tokenState, setTokenState] = useState(authToken);
	const [isLoginState, setIsLoginState] = useState(helper.isNotEmpty(authToken));
	const [authState, setAuthState] = useState<IAuthDataProps | null>(null);

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
			setAuthState(null);

			helper.deleteCookie(process.env.REACT_APP_AUTH_COOKIE);
		}
	}, [tokenState]);

	useEffect(() => {
		if (helper.isNotEmpty(tokenState)) {
			fetchDataAsync();
		} else {
			setIsLoginState(false);
			setAuthState(null);

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
				<Box
					position="fixed"
					sx={{
						paddingTop: '15%',
						width: '100%',
						height: '100%',
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						zIndex: 9999,
						backgroundColor: '#F4F6F8',
					}}
					className={clsx({ hidden: isLoginState })}
				>
					<CircularProgress size={120} />
				</Box>
			) : (
				''
			)}
			{children}
		</AuthContext.Provider>
	);
};

export { AuthProvider, GetAuth };
