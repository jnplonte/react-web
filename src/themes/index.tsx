import { createTheme } from '@mui/material/styles';

import palette from './palette';
import typography from './typography';

const basePalette: object = palette || {};
const baseTypography: object = typography || {};
const Theme = createTheme({
	palette: {
		...basePalette,
		mode: 'light',
	},
	typography: baseTypography,
	zIndex: {
		appBar: 1200,
		drawer: 1100,
	},
});

export default Theme;
