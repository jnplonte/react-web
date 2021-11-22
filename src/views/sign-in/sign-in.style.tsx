export const signInStyle = {
	grid: {
		height: '100%',
	},
	content: {
		display: 'flex',
	},
	root: (theme: any) => ({
		backgroundColor: theme.palette.background.default,
		height: '100vh',
	}),
	contentInner: (theme: any) => ({
		flexGrow: 1,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		[theme.breakpoints.down('lg')]: {
			padding: theme.spacing(2),
		},
	}),
	form: (theme: any) => ({
		[theme.breakpoints.down('lg')]: {
			paddingLeft: theme.spacing(2),
			paddingRight: theme.spacing(2),
		},
	}),
	title: (theme: any) => ({
		marginTop: theme.spacing(2),
	}),
	textField: (theme: any) => ({
		marginTop: theme.spacing(2),
	}),
	signInButton: (theme: any) => ({
		margin: theme.spacing(2, 0),
	}),
	quote: (theme: any) => ({
		backgroundColor: theme.palette.background.default,
		height: '100%',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundImage: 'url(https://picsum.photos/400/400)',
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		backgroundPosition: 'center',
		[theme.breakpoints.down('lg')]: {
			display: 'none',
		},
	}),
	quoteText: (theme: any) => ({
		color: theme.palette.white,
		fontWeight: 300,
	}),
	name: (theme: any) => ({
		marginTop: theme.spacing(3),
		color: theme.palette.white,
	}),
	bio: (theme: any) => ({
		color: theme.palette.white,
	}),
};
