export const confirmDialogStyles = {
	root: {},
	dialogTitle: {
		display: 'flex',
	},
	dialogTitleIcon: (theme: any) => ({
		marginRight: theme.spacing(1),
		display: 'flex',
		color: theme.palette.white,
		alignItems: 'center',
	}),
	dialogTitleText: (theme: any) => ({
		color: theme.palette.white,
		fontSize: '16px',
		display: 'flex',
		alignItems: 'center',
	}),
	dialogContentText: (theme: any) => ({
		padding: theme.spacing(3),
	}),
};
