export const sidebarStyle = {
	drawer: {
		zIndex: 999999,
	},
	root: (theme: any) => ({
		backgroundColor: theme.palette.white,
		height: '100%',
		width: 210,
		padding: theme.spacing(10, 2, 2, 2),
		[theme.breakpoints.down('lg')]: {
			padding: theme.spacing(2),
		},
	}),
	divider: (theme: any) => ({
		margin: theme.spacing(2, 0),
	}),
	nav: (theme: any) => ({
		marginBottom: theme.spacing(2),
	}),
};
