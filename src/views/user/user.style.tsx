import { makeStyles } from '@material-ui/styles';

export const userStyle = makeStyles((theme: any) => ({
	root: {
		padding: theme.spacing(3),
	},
	loading: {
		marginTop: theme.spacing(24),
	},
	content: {
		marginTop: theme.spacing(2),
	},
	noUser: {
		marginTop: theme.spacing(4),
	},
}));
