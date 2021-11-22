export const profileStyle = {
	root: {},
	avatarContainer: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		alignContent: 'center',
	},
	avatar: {
		width: 60,
		height: 60,
	},
	name: (theme: any) => ({
		marginTop: theme.spacing(2),
	}),
};
