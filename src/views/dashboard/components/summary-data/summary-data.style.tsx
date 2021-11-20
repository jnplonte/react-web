import { makeStyles } from '@material-ui/styles';

export const summaryStyle = makeStyles((theme: any) => ({
	root: {
		height: '100%',
	},
	title: {
		fontWeight: 700,
		textAlign: 'left',
	},
	avatar: {
		backgroundColor: theme.palette.primary.main,
		height: 56,
		width: 56,
	},
}));
