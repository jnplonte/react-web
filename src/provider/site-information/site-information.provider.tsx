import * as React from 'react';
import { createContext, useContext, useState } from 'react';

interface IContextProps {
    notificationData: object;
    setNotificationData: any;
}

interface INotificationProps {
    message: string;
    type: string;
}

export const SiteContext = createContext<IContextProps>({
    notificationData: {},
    setNotificationData: () => {},
});

const GetSiteInformation = () => {
    return useContext(SiteContext);
};

const SiteInformationProvider = (props: any) => {
    const { children } = props;

    const [notificationState, setNotificationState] = useState<object>({});

    const setNotificationStateData = (notify: INotificationProps) => {
        setNotificationState(notify);
    };

    return (
        <SiteContext.Provider value={{ notificationData: notificationState, setNotificationData: setNotificationStateData }}>
            {children}
        </SiteContext.Provider>
    );
};

export { SiteInformationProvider, GetSiteInformation };
