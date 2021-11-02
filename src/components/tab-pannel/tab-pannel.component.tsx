import * as PropTypes from 'prop-types';

import { Box } from '@material-ui/core';

const TabPanel = (props: any) => {
	const { children, value, index } = props;

	return (
		<div role="tabpanel" hidden={value !== index} id={`tabpanel-${index}`}>
			{value === index && <Box p={3}>{children}</Box>}
		</div>
	);
};

TabPanel.propTypes = {
	className: PropTypes.string,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
	children: PropTypes.any.isRequired,
};

export default TabPanel;
