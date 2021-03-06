import { makeStyles } from '@material-ui/styles';

export const signInStyle = makeStyles((theme: any) => ({
    root: {
      backgroundColor: theme.palette.background.default,
      height: '100vh',
    },
    grid: {
      height: '100%',
    },
    quoteContainer: {
      [theme.breakpoints.down('md')]: {
        display: 'none',
      },
    },
    quote: {
      backgroundColor: theme.palette.neutral,
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundImage: 'url(https://i.picsum.photos/id/293/300/600.jpg?grayscale)',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    },
    quoteInner: {
      textAlign: 'center',
      flexBasis: '600px',
    },
    quoteText: {
      color: theme.palette.white,
      fontWeight: 300,
    },
    name: {
      marginTop: theme.spacing(3),
      color: theme.palette.white,
    },
    bio: {
      color: theme.palette.white,
    },
    contentContainer: {},
    content: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    logoImage: {
      marginLeft: theme.spacing(3),
    },
    contentBody: {
      flexGrow: 1,
      display: 'flex',
      alignItems: 'center',
      [theme.breakpoints.down('md')]: {
        justifyContent: 'center',
      },
    },
    form: {
      paddingLeft: 100,
      paddingRight: 100,
      paddingBottom: 125,
      flexBasis: 700,
      [theme.breakpoints.down('sm')]: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
      },
    },
    title: {
      marginTop: theme.spacing(3),
    },
    textField: {
      marginTop: theme.spacing(2),
    },
    signInButton: {
      margin: theme.spacing(2, 0),
    },
}));
