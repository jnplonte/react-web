import * as PropTypes from 'prop-types';

import { Typography } from '@mui/material';

import { Box } from '@mui/material';

import { footerStyle } from './footer.style';

const Footer = (props: any) => {
	const { className } = props;

	return (
		<Box sx={[footerStyle.root]} className={className}>
			<Typography align="right" variant="subtitle2">
				{process.env.REACT_APP_NAME}
			</Typography>
		</Box>
	);
};

Footer.propTypes = {
	className: PropTypes.string,
};

export default Footer;
