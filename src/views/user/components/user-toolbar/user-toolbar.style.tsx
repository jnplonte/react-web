export const userToolbarStyles = {
	root: {},
	row: (theme: any) => ({
		height: '42px',
		display: 'flex',
		alignItems: 'center',
		marginTop: theme.spacing(1),
	}),
	spacer: {
		flexGrow: 1,
	},
	customW100: (theme: any) => ({
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			width: '155px',
		},
	}),
};
