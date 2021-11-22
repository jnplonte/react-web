export const topbarStyle = {
	root: {
		flexGrow: 1,
	},
	menuButton: (theme: any) => ({
		marginRight: theme.spacing(1),
	}),
	link: (theme: any) => ({
		marginLeft: theme.spacing(0.25),
		display: 'flex',
		flexGrow: 1,
	}),
	lang: (theme: any) => ({
		marginLeft: theme.spacing(0.25),
		color: theme.palette.white,
	}),
};
