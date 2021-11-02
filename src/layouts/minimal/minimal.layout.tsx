import * as PropTypes from 'prop-types';

import clsx from 'clsx';

import { minimalStyle } from './minimal.style';
import { Topbar } from './components';

import { NotificationComponent } from '../../components';

import { GetAuth } from '../../provider/authentication/authentication.provider';

const Minimal = (props: any) => {
	const { children } = props;

	const classes: any = minimalStyle();

	const { isLogin } = GetAuth();

	return (
		<div>
			<NotificationComponent />
			<Topbar className={clsx({ hidden: !isLogin })} />
			<main className={clsx(classes.content, 'minimal-container')}>{children}</main>
		</div>
	);
};

Minimal.propTypes = {
	children: PropTypes.node,
};

export default Minimal;
