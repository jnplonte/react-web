export const mainStyle = {
	root: (theme: any) => ({
		paddingTop: theme.spacing(8),
		paddingLeft: theme.spacing(30),
		[theme.breakpoints.down('lg')]: {
			paddingLeft: theme.spacing(0),
		},
	}),
	content: {
		height: '100%',
	},
};
