export const passwordStyles = {
	root: {},
	form: (theme: any) => ({
		[theme.breakpoints.down('lg')]: {
			paddingLeft: theme.spacing(2),
			paddingRight: theme.spacing(2),
		},
	}),
	textField: (theme: any) => ({
		marginTop: theme.spacing(2),
	}),
	button: (theme: any) => ({
		marginTop: theme.spacing(2),
	}),
};
