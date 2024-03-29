import * as PropTypes from 'prop-types';

import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Hidden } from '@mui/material';

const Topbar = (props: any) => {
	const { className } = props;

	return (
		<AppBar className={clsx('app-header', className)} color="primary" position="fixed">
			<Toolbar>
				<Link to="/">
					<img
						className="img"
						alt={process.env.REACT_APP_NAME}
						title={process.env.REACT_APP_NAME}
						src={process.env.REACT_APP_LOGO}
					/>
					<Hidden mdDown>
						<Typography variant="h6" className="title">
							{process.env.REACT_APP_NAME}
						</Typography>
					</Hidden>
				</Link>
			</Toolbar>
		</AppBar>
	);
};

Topbar.propTypes = {
	className: PropTypes.string,
};

export default Topbar;
