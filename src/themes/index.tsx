import { createMuiTheme } from '@material-ui/core';

import palette from './palette';
import typography from './typography';

const basePalette: object = palette || {};
const baseTypography: object = typography || {};
const Theme = createMuiTheme({
  palette: {
    ...basePalette, type: 'light',
  },
  typography: baseTypography,
  zIndex: {
    appBar: 1200,
    drawer: 1100,
  },
});

export default Theme;
