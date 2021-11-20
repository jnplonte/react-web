import { makeStyles } from '@material-ui/styles';

export const profileStyle = makeStyles((theme: any) => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		minHeight: 'fit-content',
	},
	avatar: {
		width: 60,
		height: 60,
	},
	name: {
		marginTop: theme.spacing(1),
	},
}));
