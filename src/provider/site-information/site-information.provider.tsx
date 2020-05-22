import * as React from 'react';
import { createContext, useContext, useState } from 'react';

interface IContextProps {
    notificationData: object;
    setNotificationData: any;
    theme: string;
    setTheme: any;
    locale: string;
    setLocale: any;
}

interface INotificationProps {
    message: string;
    type: string;
}

export const SiteContext = createContext<IContextProps>({
    notificationData: {},
    setNotificationData: () => {},
    theme: '',
    setTheme: () => {},
    locale: '',
    setLocale: () => {},
});

const GetSiteInformation = () => {
    return useContext(SiteContext);
};

const SiteInformationProvider = (props: any) => {
    const { children } = props;

    const [notificationState, setNotificationState] = useState<object>({});

    const [themeState, setThemeState] = useState<string>(process.env.REACT_APP_DEFAULT_THEME || '');
    const [localeState, setLocaleState] = useState<string>(process.env.REACT_APP_DEFAULT_LOCALE || '');

    const setNotificationStateData = (notify: INotificationProps) => {
        setNotificationState(notify);
    };

    const setThemeStateData = (thm: string) => {
        setThemeState(thm);
    };

    const setLocaleStateData = (lcl: string) => {
        setLocaleState(lcl);
    };

    return (
        <SiteContext.Provider value={{
                notificationData: notificationState,
                setNotificationData: setNotificationStateData,
                theme: themeState,
                setTheme: setThemeStateData,
                locale: localeState,
                setLocale: setLocaleStateData,
            }}>
            {children}
        </SiteContext.Provider>
    );
};

export { SiteInformationProvider, GetSiteInformation };
