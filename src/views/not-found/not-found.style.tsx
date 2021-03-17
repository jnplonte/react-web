import { makeStyles } from '@material-ui/styles';

export const notFoundStyle = makeStyles((theme: any) => ({
	root: {
		padding: theme.spacing(3),
	},
	content: {
		paddingTop: 150,
		textAlign: 'center',
	},
	goback: {
		cursor: 'pointer',
		fontWeight: 'bold',
	},
}));
