import { makeStyles } from '@material-ui/styles';

export const footerStyle = makeStyles((theme: any) => ({
	root: {
		padding: theme.spacing(3),
	},

	footerComponent: {
		backgroundColor: theme.palette.darkWhite,
		padding: '24px',
		textAlign: 'right',
		fontSize: '11px',
	},
}));
