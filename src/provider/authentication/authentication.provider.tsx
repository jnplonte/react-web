import * as React from 'react';
import clsx from 'clsx';
import { createContext, useContext, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import { Helper } from '../../services/helper/helper.service';
import { Request } from '../../services/request/request.service';

interface IContextProps {
    token: string;
    isLogin: boolean;
    authData: object;
    setToken: any;
}

export const AuthContext = createContext<IContextProps>({
    token: '',
    isLogin: false,
    authData: {},
    setToken: () => {},
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
    const [isLoginState, setIsLoginState] = useState(false);
    const [authState, setAuthState] = useState({});

    const setTokenStateData = (token: string) => {
        setTokenState(token);
        helper.setCookie(process.env.REACT_APP_AUTH_COOKIE, token);
    };

    useEffect(() => {
        if (helper.isNotEmpty(tokenState)) {
            const request: Request = new Request(true, tokenState);
            request.get('REACT_APP_API', 'v1/core/myuser', {})
                .then((uData: any) => {
                    if (uData.status && uData.status === 'success') {
                        setTimeout(() => { setIsLoginState(true); }, 1000); // NOTE: intentional 1sec delaay for loading
                        setAuthState(uData.data);
                      } else {
                        setIsLoginState(false);
                        setAuthState({});

                        helper.deleteCookie(process.env.REACT_APP_AUTH_COOKIE);
                      }
                })
                .catch(
                    () => {
                        setIsLoginState(false);
                        setAuthState({});

                        helper.deleteCookie(process.env.REACT_APP_AUTH_COOKIE);
                    }
                );
        } else {
            setIsLoginState(false);
            setAuthState({});

            helper.deleteCookie(process.env.REACT_APP_AUTH_COOKIE);
        }
    }, [tokenState]);

    return (
        <AuthContext.Provider value={{
                token: tokenState,
                isLogin: isLoginState,
                authData: authState,
                setToken: setTokenStateData,
            }}>
            {(tokenState) ? <div className={clsx({ [classes.root]: true, hidden: isLoginState })}><CircularProgress size={120} /></div> : ''}
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, GetAuth };
