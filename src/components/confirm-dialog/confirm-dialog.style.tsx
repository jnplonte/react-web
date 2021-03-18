import { makeStyles } from '@material-ui/styles';

export const confirmDialogStyles = makeStyles((theme: any) => ({
	root: {},
	dialogTitle: {
		padding: `${theme.spacing(1.5)}px ${theme.spacing(2)}px`,
	},
	general: {
		backgroundColor: theme.palette.primary.main,
	},
	warning: {
		backgroundColor: theme.palette.warning.main,
	},
	error: {
		backgroundColor: theme.palette.error.main,
	},
	dialogTitleIcon: {
		position: 'relative',
		top: '5px',
		marginRight: '10px',
		color: theme.palette.white,
	},
	dialogTitleText: {
		color: theme.palette.white,
		display: 'inline-block',
		fontSize: '16px',
	},
	dialogContentText: {
		padding: theme.spacing(3),
	},
}));
