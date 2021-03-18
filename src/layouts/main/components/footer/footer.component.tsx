import React from 'react';

import * as PropTypes from 'prop-types';

import clsx from 'clsx';
import { Typography } from '@material-ui/core';

import { footerStyle } from './footer.style';

const Footer = (props: any) => {
	const { className } = props;

	const classes = footerStyle();

	return (
		<div className={clsx(classes.root, classes.footerComponent, className)}>
			<Typography variant="caption">{process.env.REACT_APP_NAME}</Typography>
		</div>
	);
};

Footer.propTypes = {
	className: PropTypes.string,
};

export default Footer;
