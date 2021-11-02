import { createContext, useContext, useState } from 'react';

interface INotificationProps {
	message: string;
	type: 'error' | 'info' | 'success' | 'warning';
}

interface IContextProps {
	notificationData: INotificationProps;
	setNotificationData: any;
}

export const SiteContext = createContext<IContextProps>({
	notificationData: {} as INotificationProps,
	setNotificationData: () => {},
});

const GetSiteInformation = () => {
	return useContext(SiteContext);
};

const SiteInformationProvider = (props: any) => {
	const { children } = props;

	const [notificationState, setNotificationState] = useState<INotificationProps>({} as INotificationProps);

	const setNotificationStateData = (notify: INotificationProps) => {
		setNotificationState(notify);
	};

	return (
		<SiteContext.Provider
			value={{
				notificationData: notificationState,
				setNotificationData: setNotificationStateData,
			}}
		>
			{children}
		</SiteContext.Provider>
	);
};

export { SiteInformationProvider, GetSiteInformation };
