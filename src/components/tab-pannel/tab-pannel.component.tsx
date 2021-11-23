import * as PropTypes from 'prop-types';

import { Box } from '@mui/material';

const TabPanel = (props: any) => {
	const { children, value, index } = props;

	return (
		<Box role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`}>
			{value === index && <Box p={3}>{children}</Box>}
		</Box>
	);
};

TabPanel.propTypes = {
	className: PropTypes.string,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
	children: PropTypes.any.isRequired,
};

export default TabPanel;
