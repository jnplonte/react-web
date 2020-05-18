import { makeStyles } from '@material-ui/styles';

export const sidebarStyle = makeStyles((theme: any) => ({
    root: {
      backgroundColor: theme.palette.white,
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      padding: theme.spacing(2),
    },
    drawer: {
      width: 240,
      [theme.breakpoints.up('lg')]: {
        marginTop: 64,
        height: 'calc(100% - 64px)',
      },
    },
    divider: {
      margin: theme.spacing(2, 0),
    },
    nav: {
      marginBottom: theme.spacing(2),
    },
}));
