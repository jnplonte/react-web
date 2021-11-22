import * as PropTypes from 'prop-types';

import { Box } from '@mui/material';

import clsx from 'clsx';

import { minimalStyle } from './minimal.style';
import { Topbar } from './components';

import { NotificationComponent } from '../../components';

import { GetAuth } from '../../provider/authentication/authentication.provider';

const Minimal = (props: any) => {
	const { children } = props;

	const { isLogin } = GetAuth();

	return (
		<Box sx={[minimalStyle.root]}>
			<NotificationComponent />
			<Topbar className={clsx({ hidden: !isLogin })} />
			<main sx={minimalStyle.content} className="minimal-container">
				{children}
			</main>
		</Box>
	);
};

Minimal.propTypes = {
	children: PropTypes.node,
};

export default Minimal;
